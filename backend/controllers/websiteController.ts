// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import WebsiteSchema from '@Models/websiteSchema';
import WebsiteSections from '@Models/websiteSectionsSchema';
import SectionEntries from '@Models/sectionEntriesSchema';
import Restaurant from '@Models/restaurantSchema';

// Utils and Helpers
import { MESSAGES, STATUS_CODES, constants } from '@Utils/constant';
import { createResponse, formatMessage, randomString } from '@Utils/function';

// File Upload
import { uploadFile } from '@Utils/multer';
import Cuisine from '@Models/cuisineSchema';

export const generateWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, restaurant_id } = req.body;

    let responseData;

    let updateData: any = { ...req.body };
    let restaurantData = await Restaurant.findById(restaurant_id).populate('user_id', 'email').lean().exec();

    if (id) {
        responseData = await WebsiteSchema.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean().exec();
        res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            errorCode: null,
            message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
            data: { ...responseData, restaurant: restaurantData },
        }));

    } else {
        await randomString(10);
        let websiteString = await randomString(10);
        updateData['preview_url'] = `${constants.BACKEND_URL}/api/v1/website/init/${websiteString}`;

        const restaurantData = await Restaurant.findById(restaurant_id);

        const color: any = {
            label: 'Orange-White',
            main: '#FF5833',
            secondary: '#FFFFFF',
            light: '#FFE8E2',
            btnTextColor: '#FF5833'
        }

        const logoData: any = {
            type: "LOGO",
            title: "Logo",
            logoType: 1,
            restaurantName: restaurantData?.name,
            restaurantLogo: null,
            isActive: false,
            isOpen: false,
            isDefault: true,
            isMultiple: false
        }

        const stagingData: any = {
            type: "STAGING",
            title: "Staging",
            isActive: false,
            isOpen: false,
            isDefault: true,
            isMultiple: false,
            sections: [
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: `Revolutionize Your Restaurant with ${restaurantData?.name}`,
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    pageTitle: "Home",
                    isOpen: false,
                    type: 1,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: `Menu of ${restaurantData?.name}`,
                    desc: "Custom Food Delivery in Amsterdam",
                    pageTitle: "Menu",
                    isOpen: false,
                    type: 2,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: "Delicious Takeaway & Delivery",
                    desc: "Savor the best meals from our best Menu, it delivered right to your door.",
                    pageTitle: "Food Delivery",
                    isOpen: false,
                    type: 3,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: "Special Offers",
                    desc: "Enjoy amazing discounts and special offers on your favorite dishes. Grab them before they're gone!",
                    pageTitle: "Special Offers",
                    isOpen: false,
                    type: 4,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: "Let's Get in Touch!",
                    desc: "Have questions or need assistance? We’re here to help! Reach out to us for any inquiries, feedback, or support, and we’ll make sure your experience is as smooth as your next meal.",
                    pageTitle: "Contact Us",
                    isOpen: false,
                    type: 5,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: `${restaurantData?.name} Reservations`,
                    desc: "Book a table and experience delicious Pizza, Burger, Sandwiches, Custom in Amsterdam",
                    pageTitle: "Table Reservation",
                    isOpen: false,
                    type: 6,
                    _id: randomString(4)
                },
                {
                    bgImg: "/images/preview/hero_section.png",
                    title: "Order Ahead",
                    desc: "And Cut The Waiting Time To Mere Seconds",
                    pageTitle: "Order Ahead",
                    isOpen: false,
                    type: 7,
                    _id: randomString(4)
                },
            ],
        };

        const footerData: any = {
            type: "FOOTER",
            title: "Footer",
            isActive: false,
            isOpen: false,
            isDefault: true,
            isMultiple: false,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            getInTouchDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            links: [
                { checked: true, value: "", label: "Facebook" },
                { checked: true, value: "", label: "Instagram" },
                { checked: true, value: "", label: "Twitter" },
                { checked: true, value: "", label: "LinkedIn" },
            ],
            isCopyRight: true,
            copyRight: "2022 Foodhut.",
        };

        let sectionObe = [logoData, stagingData, footerData]

        updateData['color_scheme'] = JSON.stringify(color)
        updateData['website_sections'] = JSON.stringify(sectionObe)
        updateData['restautant_location'] = JSON.stringify({ lat: restaurantData?.latitude, long: restaurantData?.longitude })
        updateData['restaurant'] = restaurantData
        responseData = await WebsiteSchema.create(updateData);
    }

    if (!responseData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
        data: null //responseData,
    }));
});

export const manageWebsiteSections = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    let responseData;

    const updateData: any = { ...req.body };

    if (id) {
        responseData = await WebsiteSections.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        responseData = await WebsiteSections.create(updateData);
    }

    if (!responseData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
        data: responseData,
    }));
});

export const deleteWebsiteSections = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deleted = await WebsiteSections.findByIdAndDelete(id);

    if (!deleted) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            statusCode: STATUS_CODES.NOT_FOUND,
            message: MESSAGES.NOT_FOUND,
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: formatMessage(MESSAGES.DELETE, "Website sections"),
    });
});

// export const previewWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
//     const preview_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

//     const websiteData = await WebsiteSchema.findOne({ preview_url }).lean().exec();

//     if (!websiteData) {
//         return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
//             statusCode: STATUS_CODES.NOT_FOUND,
//             success: false,
//             message: MESSAGES.NOT_FOUND,
//         }));
//     }

//     const websiteSections = await WebsiteSections.find({ website_id: websiteData._id }).lean().exec();

//     if (websiteSections.length === 0) {
//         return res.status(STATUS_CODES.SUCCESS).json(createResponse({
//             statusCode: STATUS_CODES.SUCCESS,
//             success: true,
//             message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
//             data: { ...websiteData, sections: [] },
//         }));
//     }

//     const sectionEntries = websiteSections.length > 0
//         ? await Promise.all(websiteSections.map((section) =>
//             SectionEntries.find({ website_section_id: section._id }).lean().exec()
//         ))
//         : [];

//     const sections = websiteSections.map((section, index) => ({
//         ...section,
//         section_entries: sectionEntries[index] || [],
//     }));

//     return res.status(STATUS_CODES.SUCCESS).json(createResponse({
//         statusCode: STATUS_CODES.SUCCESS,
//         success: true,
//         message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
//         data: { ...websiteData, sections },
//     }));
// });


export const previewWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const preview_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const websiteData = await WebsiteSchema.findOne({ preview_url }).lean().exec();

    if (!websiteData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: websiteData,
    }));
});

export const manageSectionEntries = catchAsyncErrors(async (req: Request, res: Response) => {
    const { id, isDeleted, ...bodyData } = req.body;
    const filePath = req.file?.path;

    if (id) {
        const existingDoc = await SectionEntries.findById(id);
        if (!existingDoc) {
            return res.status(404).json(createResponse({
                statusCode: 404,
                success: false,
                message: MESSAGES.NOT_FOUND
            }));
        }

        if (isDeleted) {
            if (existingDoc?.file_path) await uploadFile.deleteFile(existingDoc.file_path);
            await SectionEntries.findByIdAndDelete(id);
            return res.status(200).json(createResponse({
                statusCode: 200,
                success: true,
                message: formatMessage(MESSAGES.DELETE, "Section entries")
            }));
        }

        if (filePath && existingDoc?.file_path) await uploadFile.deleteFile(existingDoc.file_path);
        const updatedDoc = await SectionEntries.findByIdAndUpdate(id, { ...bodyData, file_path: filePath || existingDoc.file_path }, { new: true, runValidators: true });
        return res.status(200).json(createResponse({
            statusCode: 200,
            success: true,
            message: formatMessage(MESSAGES.UPDATE, "Section entries"),
            data: updatedDoc
        }));
    }

    const createdDoc = await SectionEntries.create({ ...bodyData, file_path: filePath });
    return res.status(201).json(createResponse({
        statusCode: 201,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Section entries"),
        data: createdDoc
    }));
});

export const fetchWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { restaurant_id } = req.body

    const websiteData = await WebsiteSchema.findOne({ restaurant_id }).sort({ _id: -1 }).lean().exec();

    if (!websiteData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const cuisinesData = await Cuisine.find({
        restaurant_id,
        is_deleted: false,
    }, { cuisine_name: 1 }).lean().exec();

    const restaurantData = await Restaurant.findById(restaurant_id).populate('user_id', 'email').lean().exec();
    const updateData: any = websiteData
    updateData['restautant_location'] = JSON.stringify({ lat: restaurantData?.latitude, long: restaurantData?.longitude })
    updateData['restaurant'] = restaurantData
    updateData['cuisines'] = cuisinesData


    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: updateData,
    }));
});