// Core and Third-Party Libraries
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import * as Sentry from '@sentry/node';
import jwt from "jsonwebtoken";
import dns from "dns";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import Stripe from 'stripe';

// Models
import Item from '@Models/menuItemSchema';
import sizeSchema from '@Models/sizeSchema';
import Restaurant from '@Models/restaurantSchema';
import RestaurantHours from '@Models/restaurantHoursSchema';
import TaxRates from '@Models/taxRateSchema';
import Menu from '@Models/menuSchema';
import Addon from '@Models/addonSchema';
import Choice from '@Models/choiceSchema';
import Category from '@Models/categorySchema';
import Size from '@Models/sizeSchema';
import Allergens from '@Models/allergensSchema';
import Tag from '@Models/tagSchema';
import DeliveryZone from '@Models/deliveryZoneSchema';
import Cuisine from "@Models/cuisineSchema";
import DefaultCuisine from "@Models/defaultCuisineSchema";
import Promotion from "@Models/promotionSchema";
import ItemsExtraDetail from '@Models/itemsExtraDetailSchema';
import EmailLog from '@Models/emailLogSchema';
import Logs from '@Models/logSchema';
import PermissionsSchema from '@Models/permissionsSchema';

// Utils and Helpers
import { constants, MESSAGES, STATUS_CODES, SUB_PERMISSION } from '@Utils/constant';
import redisClient from "@Config/redis";
import { ApiResponse } from './types';
import moment from 'moment';

export const sendMail = async (email: string, body: string, subject: string): Promise<boolean> => {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            host: constants.MAIL_SMTP_HOST as string,
            port: Number(constants.MAIL_SMTP_PORT),
            secure: false, // Set to true for port 465, false for other ports
            auth: {
                user: constants.MAIL_SMTP_USER as string,
                pass: constants.MAIL_SMTP_PASSWORD as string,
            },
            tls: {
                rejectUnauthorized: constants.MAIL_SMTP_TLS_PROTOCOL as string === 'true' ? false : true
            }
        });

        const mailOptions: SendMailOptions = {
            from: {
                name: constants.COMPANY_NAME,
                address: constants.MAIL_SMTP_FROM as string
            },
            to: email,
            subject: subject,
            html: body,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        Sentry.captureException(err);
        console.error('Error sending email:', err);
        return false;
    }
};

export const createJWTToken = (id: any) => {
    return jwt.sign({ id }, constants.JWT_REFRESH_SECRET as string, { expiresIn: constants.JWT_REFRESH_EXPIRES_IN });
};

export const createUserToken = (userData: any) => {
    return jwt.sign(userData, constants.JWT_SECRET as string, { expiresIn: constants.JWT_EXPIRES_IN });
};

export const createResponse = <T = any>({ statusCode, success, errorCode = null, message = '', data, record_count }: {
    statusCode: number;
    success: boolean;
    errorCode?: string | null;
    message?: string;
    data?: T;
    record_count?: number;
}): ApiResponse<T> => ({
    statusCode, success, error_code: errorCode, message, data, record_count
});


//generate random String
export const randomString = async (strLength: number) => {
    var result = '';
    var charSet = '';

    strLength = strLength || 5;
    charSet = constants.CHAR_SET

    while (strLength--) { // (note, fixed typo)
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    return result;
}

// Verify if a domain exists using DNS lookup
export const verifyDomainExists = (domain: string): Promise<boolean> => {

    return new Promise((resolve, reject) => {
        dns.lookup(domain, (err) => {
            // console.log("err", err)
            if (err && err.code === 'ENOTFOUND') {
                Sentry.captureException(err);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const formatMessage = (message: string, data: string) => {
    return message.replace("{data}", data);
};

// Store data in Redis
export const storeRedisData = async (key: string, value: any, expireTime: number) => {
    try {
        const dataToStore = JSON.stringify(value);
        await redisClient.set(key, dataToStore);

        if (expireTime) {
            await redisClient.expire(key, expireTime);
        }
    } catch (error) {
        Sentry.captureException(error);
        console.error("error::::::::", error);
        throw error;
    }
};

export const getRedisData = async (key: any) => {
    const value = await redisClient.get(key);

    return value ? JSON.parse(value) : null
};

// Delete data from Redis by key
export const deleteRedisData = async (key: string) => {
    return await redisClient.del(key);
};

export const duplicateDocument = async (document: any, Model: any) => {
    const docData = document.toObject();
    delete docData._id;
    delete docData.createdAt;
    delete docData.updatedAt;
    docData.name = docData.name + " (copy)"
    const newDocument = new Model(docData);
    const savedDoc = await newDocument.save();

    if (Model.schema.path("addons")) {
        return await savedDoc.populate("addons");
    }
    return savedDoc;
}

// Function to duplicate related entities and nest the duplicated entities
export const duplicateRelatedEntities = async (originalEntity: any, newEntity: any, RelatedModel: any, foreignKey: string, type: number) => {
    const relatedEntities = await RelatedModel.find({ [foreignKey]: originalEntity._id });
    const duplicatedRelatedEntities = [];

    for (const relatedEntity of relatedEntities) {
        const newRelatedEntityData = relatedEntity.toObject();
        delete newRelatedEntityData._id;
        delete newRelatedEntityData.createdAt;
        delete newRelatedEntityData.updatedAt;
        newRelatedEntityData[foreignKey] = newEntity._id;

        const newRelatedEntity = new RelatedModel(newRelatedEntityData);
        const createdRelatedEntity = await newRelatedEntity.save();
        if (createdRelatedEntity?.addons) {
            await createdRelatedEntity.populate('addons');
        }
        let sizes: any = [];
        if (type === 1 && RelatedModel === Item) {
            sizes = await duplicateSizes(relatedEntity._id, createdRelatedEntity._id);
        }

        duplicatedRelatedEntities.push({
            ...createdRelatedEntity.toObject(),
            sizes, // Nested duplicated sub-entities (e.g., sizes under items)
        });
    }

    return duplicatedRelatedEntities;
};

// Function to duplicate sizes for each item
const duplicateSizes = async (originalItemId: any, newItemId: any) => {
    const sizes = await sizeSchema.find({ item_id: originalItemId });
    const duplicatedSizes = [];

    for (const size of sizes) {
        const newSizeData = size.toObject();
        delete newSizeData._id;
        newSizeData.item_id = newItemId;

        const newSize = new sizeSchema(newSizeData);
        const createdSize = await newSize.save();
        if (createdSize?.addons) {
            await createdSize.populate('addons')
        }
        duplicatedSizes.push(createdSize.toObject());
    }

    return duplicatedSizes;
};

export function getModelByType(type: number): any {
    const modelsMap: { [key: number]: any } = {
        // 1: User,
        2: Restaurant,
        3: RestaurantHours,
        4: TaxRates,
        5: Menu,
        6: Item,
        7: Addon,
        8: Choice,
        9: Category,
        10: Size,
        11: Allergens,
        12: Tag,
        13: DeliveryZone,
        14: Cuisine,
        15: DefaultCuisine,
        16: Promotion,
    };
    return modelsMap[type];
}

export function generateOrderId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const randomString = Math.random().toString(36).substring(2, 6);
    return `ORD-${timestamp}-${randomString}`;
}

export const restaurantSetup = async (id: any, userId: any) => {
    try {
        const createMenu = await Menu.create({
            restaurant_id: id,
            name: "Premier menu",
            description: "Menu description",
            user_id: userId
        });

        await Restaurant.findByIdAndUpdate(id, { menu_id: createMenu._id });

        const ItemsExtraDetailData = await ItemsExtraDetail.find({ is_default: true, is_deleted: false });
        if (ItemsExtraDetailData && ItemsExtraDetailData?.length > 0) {
            const newExtraDetail = ItemsExtraDetailData.map(item => ({
                ...item.toObject(),
                restaurant_id: id,
                menu_id: createMenu._id,
                _id: undefined
            }));
            await ItemsExtraDetail.insertMany(newExtraDetail);
        }



        for (let i = 0; i < 7; i++) {
            await RestaurantHours.create({
                restaurant_id: id,
                services: i,
                hours: [
                    {
                        "day": 0,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 1,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 2,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 3,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 4,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 5,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    },
                    {
                        "day": 6,
                        "hours": [
                            {
                                "start_time": null,
                                "end_time": null
                            }
                        ],
                        "is_selected": true
                    }
                ],
            });
        }


    } catch (error) {
        throw error;
    }
};

export const createCustomerToken = (userData: any) => {
    return jwt.sign(userData, constants.JWT_CUS_SECRET as string, { expiresIn: constants.JWT_CUS_EXPIRES_IN });
};

export const sendNotification = async (type: number, recipient: string, subject: string, content: any) => {
    try {
        let response;
        let logData: any = {
            content,
            status: true,
            type: type,
        };

        if (type == 1) {
            // Sending Email
            response = await axios.post(
                "https://api.pepipost.com/v2/sendEmail",
                {
                    personalizations: [{ recipient }],
                    from: {
                        email: constants.EMAIL_SENDER_ADDRESS,
                        name: constants.EMAIL_SENDER_NAME,
                    },
                    subject,
                    content: [{ type: "html", value: content }],
                },
                {
                    headers: {
                        api_key: constants.EMAIL_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            logData = {
                ...logData,
                from_email: constants.EMAIL_SENDER_ADDRESS,
                to_email: recipient,
                subject,
                response: response.data,
                message_id: response.data.message_id,
            };
        } else if (type == 2) {
            // Sending SMS
            response = await axios.post(
                constants.SMS_API_URL as string,
                {
                    to: recipient,
                    from: constants.SMS_FROM_PHONE,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${constants.SMS_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // SMS
            logData = {
                ...logData,
                from_phone: constants.SMS_FROM_PHONE,
                to_phone: recipient,
                response: response.data,
                message_id: response.data.message_id || null,
            };
        }

        await EmailLog.create(logData);
        return true
    } catch (error) {
        await EmailLog.create({
            content,
            status: false,
            type: type,
            error: error,
            ...(type === 1
                ? { from_email: constants.EMAIL_SENDER_ADDRESS, to_email: recipient, subject }
                : { from_phone: process.env.SMS_FROM_PHONE, to_phone: recipient }),
        });
    }
    return false
};

// export const generateQRCodes = async (
//     template_type: number,
//     ranges: { prefix: string; min: number; max: number }[],
//     baseUrl: string
// ): Promise<{ qrCode: string; qrCodeData: string }[]> => {
//     const qrCodes = await Promise.all(
//         ranges.map(async (range) => {
//             const qrCodePromises: any[] = [];

//             for (let i = range.min; i <= range.max; i++) {
//                 const qrCodeData = `${range.prefix}-${i}`;
//                 // const qrLink = `${baseUrl}${qrCodeData}`;
//                 const qrLink = baseUrl;

//                 qrCodePromises.push(
//                     QRCode.toDataURL(qrLink).then((qrCode) => ({ qrCode, qrCodeData }))
//                 );
//             }

//             return Promise.all(qrCodePromises);
//         })
//     );

//     return qrCodes.flat();
// };

export const generateQRCodes = async (
    template_type: number,
    ranges: { prefix: string; min: number; max: number }[],
    baseUrl: string
): Promise<{ qrCode: string; qrCodeData: string }[]> => {

    if (template_type === 1 && ranges.length > 0) {
        // const firstRange = ranges[0];
        // const qrCodeData = `${firstRange.prefix}-${firstRange.min}`;

        const qrCode = await QRCode.toDataURL(baseUrl);
        return [{ qrCode, qrCodeData: "" }];
    }

    const qrCodes = await Promise.all(
        ranges.map(async (range) => {
            const qrCodePromises: any[] = [];

            for (let i = range.min; i <= range.max; i++) {
                const qrCodeData = `${range.prefix}-${i}`;
                const qrLink = baseUrl;

                qrCodePromises.push(
                    QRCode.toDataURL(qrLink).then((qrCode) => ({ qrCode, qrCodeData }))
                );
            }

            return Promise.all(qrCodePromises);
        })
    );

    return qrCodes.flat();
};

export const generateQRCodePDF = async (
    qrCodes: { qrCode: string; qrCodeData: string }[],
    fileName: string,
    options: { pageWidth: number; pageHeight: number; qrCodeWidth: number; qrCodeHeight: number }
): Promise<string> => {
    const { pageWidth, pageHeight, qrCodeWidth, qrCodeHeight } = options;

    const destinationDir = path.join(constants.UPLOAD_DIR, 'qrCode');
    const isExists = await fs.existsSync(destinationDir);
    if (isExists === false) {
        await fs.mkdirSync(destinationDir, { recursive: true });
    }

    const pdfFilePath = path.join(destinationDir, fileName);

    const doc = new PDFDocument({
        size: [pageWidth, pageHeight],
    });

    doc.pipe(fs.createWriteStream(pdfFilePath));

    qrCodes.forEach((qr, index) => {
        // Calculate center positions for QR code and text as a unit
        const totalContentHeight = qrCodeHeight + 50; // QR code height + space for text
        const yStart = (pageHeight - totalContentHeight) / 2; // Center content vertically
        const qrX = (pageWidth - qrCodeWidth) / 2; // Center QR code horizontally

        // Add the QR code to the page
        doc.image(qr.qrCode, qrX, yStart, {
            width: qrCodeWidth,
            height: qrCodeHeight,
        });

        // Add the text directly below the QR code
        doc.text(qr.qrCodeData, 0, yStart + qrCodeHeight + 5, {
            align: 'center', // Center the text horizontally
            width: pageWidth, // Ensure it spans the page width
        });

        // Add a new page for the next QR code
        if (index < qrCodes.length - 1) {
            doc.addPage();
        }
    });

    doc.end();

    return pdfFilePath;
};

export const generateFlyerPDF = async (
    flyerPages: { image: string }[],
    fileName: string
  ): Promise<string> => {

    const destinationDir = path.join(constants.UPLOAD_DIR, "flyers");
    const isExists = await fs.existsSync(destinationDir);
    if (isExists === false) {
        await fs.mkdirSync(destinationDir, { recursive: true });
    }
  
    const pdfFilePath = path.join(destinationDir, fileName);
    const doc = new PDFDocument({ size: "A4" });
  
    // Create writable stream to save the PDF
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);
  
    // Add up to 2 images from flyer pages
    flyerPages.slice(0, 2).forEach((flyer, index) => {
      doc.image(flyer.image, 50, 50, { width: 500, height: 700 });
  
      // Add a new page if there's another image
      if (index === 0 && flyerPages.length > 1) {
        doc.addPage();
      }
    });
  
    doc.end();
  
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => resolve(pdfFilePath));
      writeStream.on("error", (error) => reject(error));
    });
  };


export const paymentMethodMap: any = {
    1: "Credit / Debit Card",
    2: "Cash on Delivery",
    3: "PayPal",
    4: "Bank Transfer",
    5: "Digital Wallet",
    6: "Cash",
    7: "Voucher",
    8: "Card Details",
    9: "At Pickup Counter",
    10: "Other",
};

const GOOGLE_API_KEY = "AIzaSyCVdjXD_FnLKsQTNU8ki6Np_YlfwU0Oyec";

async function getDistanceMatrix(origin: string, destination: string) {
    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json`;
    const response = await axios.get(distanceMatrixUrl, {
        params: {
            origins: origin,
            destinations: destination,
            key: GOOGLE_API_KEY,
        },
    });
    return response.data.rows[0].elements[0];
}

async function getAutocompletePredictions(input: string) {
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const response = await axios.get(autocompleteUrl, {
        params: {
            input: input,
            key: GOOGLE_API_KEY,
        },
    });
    // console.log("response.data.predictions", response.data.predictions.length)
    return response.data.predictions;
}

async function getPlaceDetailsAndDistance(placeId: string, userLocation: string) {
    try {
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
        const placeDetailsResponse = await axios.get(placeDetailsUrl, {
            params: {
                place_id: placeId,
                key: GOOGLE_API_KEY,
            },
        });

        const placeDetails = placeDetailsResponse.data.result;
        const placeLocation = `${placeDetails.geometry.location.lat},${placeDetails.geometry.location.lng}`;

        const distanceData = await getDistanceMatrix(userLocation, placeLocation);

        if (distanceData?.distance?.text && distanceData?.duration?.text) {
            return {
                name: placeDetails?.name,
                address: placeDetails?.formatted_address,
                distance: distanceData?.distance?.text,
                duration: distanceData?.duration?.text,
                distanceValue: distanceData?.distance?.value, // in meters
            };
        } else {
            return {
                name: placeDetails?.name,
                address: placeDetails?.formatted_address,
                distance: 'Distance not available',
                duration: 'Duration not available',
                distanceValue: null,
            };
        }
    } catch (error) {
        console.error("Error fetching place details and distance:", error);
        return null
    }
}

export async function handleLocationSearch(input: string, userLocation: string) {
    try {
        let responseData: any[] = [];
        const predictions = await getAutocompletePredictions(input);

        if (predictions && predictions?.length > 0) {
            const promises = predictions.map(async (pre: any) => {

                const placeId = pre.place_id;
                const placeDetails = await getPlaceDetailsAndDistance(placeId, userLocation);
                return placeDetails;
            });

            responseData = await Promise.all(promises);
            responseData = responseData
                .filter((place) => place.distanceValue !== null)
                .sort((a, b) => a.distanceValue - b.distanceValue);
            return responseData;
        } else {
            return [];
        }
    } catch (error) {
        // console.error("error::::::::::::::::::", error)
        return [];
    }
}

let IdToken = "adamomar:f775df9a-5ca2-4c67-b9c9-6c10d2fe1759"
let ContentType = "application/json"

const API_OPTION = {
    headers: {
        'Content-Type': "application/json",
        'Id-Token': "adamomar:f775df9a-5ca2-4c67-b9c9-6c10d2fe1759"
    }
};

export const mealMeData = async (storeID: string) => {
    try {
        // Make the API POST request
        // const response = await axios.get(
        //     `https://api.mealme.ai/details/inventory/v3?store_id=${storeID}&pickup=false&include_quote=false&quote_preference=first_available&include_customizations=true&budget=20&user_latitude=37.7786357&user_longitude=-122.3918135&user_street_num=188&user_street_name=King%20Street&user_city=San%20Francisco&user_state=CA&user_zipcode=94107&user_country=US&image_height=300&image_width=300&available=true&include_fees=true&include_menu=true`,
        //     {
        //         headers: API_OPTION.headers
        //     }
        // );


        const response = await axios.get(
            `https://api.mealme.ai/search/store/v3?latitude=40.9217172&longitude=-74.3511123`,
            {
                headers: API_OPTION.headers
            }
        );

        // Return the response data as a JSON string
        // console.log("response.data", response.data)
        return JSON.stringify(response.data.stores[0]);
        // return response.data.stores[0]
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching MealMe data:", error);

        // Return false to indicate failure
        return false;
    }
};

export const categoriesWithAllDetails = async (menu_id: string) => {
    try {
        const categories = await Category.find({ menu_id, is_deleted: false }).sort({ sort_order: 1 });

        const categoriesWithDetails = await Promise.all(categories.map(async (category) => {
            const addons = await Addon.find({ _id: { $in: category.addons }, is_deleted: false });
            const addonsWithChoices = await Promise.all(addons.map(async (addon) => {
                const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                return {
                    ...addon.toObject(),
                    choices,
                };
            }));

            const items = await Item.find({ category_id: category._id, is_deleted: false })
                .sort({ sort_order: 1 })
                .populate('tax_category_id')
                .populate({
                    path: 'items_extra_detail_id',
                    select: 'name type',
                    match: { is_deleted: false },
                })
                .populate('tags', 'tag_name icon_image');

            const itemsWithDetails = await Promise.all(items.map(async (item) => {
                const itemAddons = await Addon.find({ _id: { $in: item.addons }, is_deleted: false });
                const itemAddonsWithChoices = await Promise.all(itemAddons.map(async (addon) => {
                    const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                    return {
                        ...addon.toObject(),
                        choices,
                    };
                }));

                const sizes = await Size.find({ item_id: item._id, is_deleted: false }).sort({ sort_order: 1 });
                const sizesWithDetails = await Promise.all(sizes.map(async (size) => {
                    const sizeAddons = await Addon.find({ _id: { $in: size.addons }, is_deleted: false });
                    const sizeAddonsWithChoices = await Promise.all(sizeAddons.map(async (addon) => {
                        const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                        return {
                            ...addon.toObject(),
                            choices,
                        };
                    }));

                    return {
                        ...size.toObject(),
                        addons: sizeAddonsWithChoices,
                    };
                }));

                return {
                    ...item.toObject(),
                    addons: itemAddonsWithChoices,
                    sizes: sizesWithDetails,
                };
            }));

            return {
                ...category.toObject(),
                addons: addonsWithChoices,
                items: itemsWithDetails,
            };
        }));

        return categoriesWithDetails;
    } catch (error) {
        console.error('Error fetching categories with details:', error);
        throw new Error('Failed to fetch categories with details.');
    }
};

export const categoriesDetailsForApp = async (menu_id: string) => {
    try {
        const categories = await Category.find({ menu_id, is_deleted: false, is_active: { $in: [true, null] }, is_visible: { $in: [true, null] } }).sort({ sort_order: 1 });

        const categoriesWithDetails = await Promise.all(categories.map(async (category) => {
            const addons = await Addon.find({ _id: { $in: category.addons }, is_deleted: false });
            const addonsWithChoices = await Promise.all(addons.map(async (addon) => {
                const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                return {
                    ...addon.toObject(),
                    choices,
                };
            }));

            const items = await Item.find({ category_id: category._id, is_deleted: false, is_active: { $in: [true, null] }, is_visible: { $in: [true, null] } })
                .sort({ sort_order: 1 })
                .populate('tax_category_id')
                .populate({
                    path: 'items_extra_detail_id',
                    select: 'name type',
                    match: { is_deleted: false },
                })
                .populate('tags', 'tag_name icon_image');

            const itemsWithDetails = await Promise.all(items.map(async (item) => {
                const itemAddons = await Addon.find({ _id: { $in: item.addons }, is_deleted: false });
                const itemAddonsWithChoices = await Promise.all(itemAddons.map(async (addon) => {
                    const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                    return {
                        ...addon.toObject(),
                        choices,
                    };
                }));

                const sizes = await Size.find({ item_id: item._id, is_deleted: false }).sort({ sort_order: 1 });
                const sizesWithDetails = await Promise.all(sizes.map(async (size) => {
                    const sizeAddons = await Addon.find({ _id: { $in: size.addons }, is_deleted: false });
                    const sizeAddonsWithChoices = await Promise.all(sizeAddons.map(async (addon) => {
                        const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
                        return {
                            ...addon.toObject(),
                            choices,
                        };
                    }));

                    return {
                        ...size.toObject(),
                        addons: sizeAddonsWithChoices,
                    };
                }));

                return {
                    ...item.toObject(),
                    addons: itemAddonsWithChoices,
                    sizes: sizesWithDetails,
                };
            }));

            return {
                ...category.toObject(),
                addons: addonsWithChoices,
                items: itemsWithDetails,
            };
        }));

        return categoriesWithDetails;
    } catch (error) {
        console.error('Error fetching categories with details:', error);
        throw new Error('Failed to fetch categories with details.');
    }
};

export const encryptDecryptString = async (string: any, type = 0) => {
    try {
        const crypto = require('crypto');
        const algorithm = 'aes-256-ctr';
        const ENCRYPTION_KEY = 'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082';
        const IV_LENGTH = 16;

        if (type == 0) {
            let iv = crypto.randomBytes(IV_LENGTH);
            let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
            let encrypted = cipher.update(string);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        } else {
            let textParts = string.split(':');
            let iv = Buffer.from(textParts.shift(), 'hex');
            let encryptedText = Buffer.from(textParts.join(':'), 'hex');
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
    } catch (error) {
        console.log('encryption error', error);
    }
}

export const stripeInstance = async (restaurantId: string) => {
    const restaurant = await Restaurant.findById(restaurantId).select("+stripe_key stripe_version");

    if (!restaurant) {
        throw new Error(MESSAGES.INTERNAL_SERVER_ERROR);
    }

    const decryptedStripeSecretKey = await encryptDecryptString(restaurant.stripe_key, 1);
    const validVersions = ["2024-12-18.acacia", "2024-01-01", "2023-11-01"];

    let apiVersion: "2024-12-18.acacia" | undefined;
    if (validVersions.includes(restaurant.stripe_version)) {
        apiVersion = restaurant.stripe_version as "2024-12-18.acacia";
    }

    const stripe = new Stripe(decryptedStripeSecretKey, {
        apiVersion: apiVersion,
    });

    return stripe;
};


export const createLogs = async (logData: any) => {
    await Logs.create(logData)
};

// export const permissionsProcess = async (permissionIds: string[]) => {
//     try {
//         const permissionsData: any = await PermissionsSchema.find();

//         const processedPermissions = permissionsData.map((permission: { _id: string, title: string, module: string, slug: string }) => {
//             const isAccess = permissionIds.includes(permission._id.toString());

//             let subPermission: any[] = []
//             if (permission.slug == 'restaurant_basics' && isAccess) {
//                 subPermission = SUB_PERMISSION
//             }
//             return {
//                 title: permission.title,
//                 module: permission.module,
//                 slug: permission.slug,
//                 is_access: isAccess,
//                 sub_permission: subPermission
//             };
//         });

//         return processedPermissions;
//     } catch (error) {
//         console.error('Error processing permissions:', error);
//         return []
//     }
// };


export const permissionsProcess = async (permissionIds: string[]) => {
    try {
        const permissionsData: any = await PermissionsSchema.find();

        const processedPermissions = permissionsData.map((permission: { _id: string, title: string, module: string, slug: string }) => {
            const isAccess = permissionIds.includes(permission._id.toString());

            const subPermission = isAccess ? getSubPermissionsForSlug(permission.slug) : [];

            return {
                // title: permission.title,
                // module: permission.module,
                slug: permission.slug,
                is_access: isAccess,
                sub_permission: subPermission
            };
        });

        return processedPermissions;
    } catch (error) {
        console.error('Error processing permissions:', error);
        return [];
    }
};

const getSubPermissionsForSlug = (slug: string) => {
    const permission = SUB_PERMISSION.find(item => item.slug === slug);
    return permission ? permission.sub_permission : [];
};

export const generateCouponCode = (length: number = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let couponCode = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        couponCode += characters[randomIndex];
    }

    return couponCode;
}


export const applyPromotion = async (promotionData: any, cartItems: any[], cartValue: number, paymentMethods: any[], deliveryZone: string, customerId: string, customSelection: string, orderType: number, clientType: number) => {
    const currentTime = moment().unix();

    if (promotionData.start_date && (promotionData.start_date > currentTime || promotionData.end_date < currentTime)) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.COUPON_EXPIRED,
        };
    }

    if (!promotionData.is_active) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.COUPON_NOT_ACTIVE,
        };
    }

    if (promotionData.client_type && promotionData.client_type !== clientType) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.INVALID_CLIENT_TYPE,
        };
    }

    if ((promotionData.eligible_payment_methods?.length > 0) && !promotionData.eligible_payment_methods.some((method: number) => paymentMethods.includes(method))) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.INVALID_PAYMENT_METHOD,
        };
    }

    if (promotionData.order_type && promotionData.order_type !== orderType) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.INVALID_ORDER_TYPE,
        };
    }

    if (orderType === 2 && promotionData.custom_selection && !promotionData.custom_selection.includes(customSelection)) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.INVALID_ORDER_TYPE,
        };
    }

    if (promotionData.usage_maximum && promotionData.usage_counter >= promotionData.usage_maximum) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.PROMOTION_LIMIT_REACHED,
        };
    }

    if (promotionData.once_per_client && promotionData.users_used.includes(customerId)) {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.COUPON_USED_ALREADY,
        };
    }

    switch (promotionData.type) {
        case 1: // CART promotion
            if (promotionData.minimum_order_value && cartValue < promotionData.minimum_order_value) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.MINIMUM_ORDER_VALUE_NOT_MET,
                };
            }
            break;

        case 2: // ITEMS promotion
            const eligibleItems = promotionData.items || [];
            const hasEligibleItems = cartItems.some(cartItem =>
                eligibleItems.some((promotionItem: { items: any }) => promotionItem.items.toString() === cartItem.item_id)
            );

            if (!hasEligibleItems) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.NO_ELIGIBLE_ITEMS,
                };
            }
            break;


        case 3: // FREE DELIVERY promotion
            if (promotionData.is_selected_delivery_zone && !promotionData.selected_delivery_zones.includes(deliveryZone)) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.INVALID_DELIVERY_ZONE,
                };
            }
            break;

        case 4: // BUY ONE, GET ONE promotion
            if (!cartItems || cartItems.length === 0) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.NO_ITEMS_IN_CART,
                };
            }

            const buyOneGetOneItems = promotionData.items || [];
            const freeItems = promotionData.free_items || [];

            const invalidItems = cartItems.filter(cartItem => {

                const cartItemId = cartItem.item_id.toString();
                const itemInPromotion = buyOneGetOneItems.some((item: { items: any; sizes: any[]; }) => {
                    const isItemInPromotion = item.items.toString() === cartItemId;
                    if (!isItemInPromotion) return false;

                    if (!item.sizes || item.sizes.length === 0) {
                        return true;
                    }

                    const isValidSize = cartItem.size_id && item.sizes.some(size => size.toString() === cartItem.size_id.toString());
                    return isValidSize;
                });

                if (!itemInPromotion) {
                    return true;
                }

                return false;
            });

            if (invalidItems.length > 0) {
                const invalidItem = invalidItems[0];
                const itemMessage = buyOneGetOneItems.some((item: { items: { toString: () => any; }; }) => item.items.toString() === invalidItem.item_id)
                    ? MESSAGES.ITEM_SIZE_NOT_SELECTED
                    : MESSAGES.ITEM_NOT_IN_PROMOTION;

                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: itemMessage,
                };
            }

            if (buyOneGetOneItems.length > 0 && freeItems.length > 0) {
                const purchasedItems = cartItems.filter(cartItem =>
                    buyOneGetOneItems.some((item: { items: any }) => item.items.toString() === cartItem.item_id.toString())
                );

                if (purchasedItems.length < 1) {
                    return {
                        statusCode: STATUS_CODES.BAD_REQUEST,
                        success: false,
                        message: MESSAGES.NOT_ELIGIBLE_FOR_BOGO,
                    };
                }
            }
            break;

        case 5: // FIXED DISCOUNT promotion
            const fixedDiscount = promotionData.amount || 0;
            if (fixedDiscount > cartValue) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.DISCOUNT_EXCEEDS_CART_VALUE,
                };
            }
            break;

        case 6: // PAYMENT METHOD REWARD promotion
            if (promotionData.eligible_payment_methods && !promotionData.eligible_payment_methods.includes(paymentMethods)) {
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    success: false,
                    message: MESSAGES.INVALID_PAYMENT_METHOD_FOR_REWARD,
                };
            }
            break;

        // case 7: // GET A FREE ITEM promotion
        //     const freeItemsList = promotionData.free_items || [];
        //     if (freeItemsList.length > 0) {
        //         cartItems.push(freeItemsList[0]);
        //     }
        //     break;

        default:
            return {
                statusCode: STATUS_CODES.BAD_REQUEST,
                success: false,
                message: MESSAGES.INVALID_PROMOTION_TYPE,
            };
    }

    return {
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.COUPON_APPLIED_SUCCESSFULLY,
        data: promotionData,
    };
};