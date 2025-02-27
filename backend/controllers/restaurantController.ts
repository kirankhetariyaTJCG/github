// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Restaurant from '@Models/restaurantSchema';
import RestaurantHours from '@Models/restaurantHoursSchema';
import TaxRates from '@Models/taxRateSchema';
import Item from '@Models/menuItemSchema';
import Promotion from '@Models/promotionSchema';
import DeliveryZone from '@Models/deliveryZoneSchema';
import Order from '@Models/orderSchema';
import Cart from '@Models/cartSchema';
import PauseServices from '@Models/pauseServicesSchema';

// Utils and Helpers
import { MESSAGES, STATUS_CODES } from '@Utils/constant';
import { categoriesDetailsForApp, createResponse, encryptDecryptString, formatMessage, generateOrderId, getModelByType, getRedisData, randomString, storeRedisData, verifyDomainExists } from '@Utils/function';

// Error Handling
import ErrorHandler from '@Utils/errorHandler';

// Update restaurant details
export const updateRestaurant = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const updateData: any = { ...req.body };

    if (req.body.website) {
        try {
            updateData.is_website_verified = await verifyDomainExists(req.body.website);
        } catch {
            return res.status(500).json(createResponse({
                statusCode: 500,
                success: false,
                errorCode: 'DomainVerificationError',
                message: 'Domain verification error',
            }));
        }
    }
    if (req.body?.stripe_key || req.body?.stripe_frontend_key) {
        updateData.stripe_key = await encryptDecryptString(req.body.stripe_key);
        updateData.stripe_frontend_key = await encryptDecryptString(req.body.stripe_frontend_key);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
        new: true,
    }).populate("user_id");

    if (!restaurant) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    const response: any = {
        ...restaurant.toObject(),
        user: restaurant.user_id,
    };
    delete response.user_id;

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Restaurant"),
        data: response,
    }));
});

// Get restaurant details by ID
export const getRestaurantById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const restaurant = await Restaurant.findById(id)
        .populate("user_id")
        .lean();

    if (!restaurant) {
        return res.status(STATUS_CODES.NOT_FOUND)
            .json({
                success: false,
                statusCode: STATUS_CODES.NOT_FOUND,
                message: MESSAGES.NOT_FOUND
            });
    }

    const response: any = {
        ...restaurant,
        user: restaurant.user_id
    };

    delete response.user_id;

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: response
    }));
});

export const getRestaurantDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id, tracker, source } = req.body;
    let id = restaurant_id
    // if (tracker) {
    //     const redisData = await getRedisData(tracker);
    //     if (redisData) {
    //         return res.status(STATUS_CODES.SUCCESS).json(createResponse({
    //             statusCode: STATUS_CODES.SUCCESS,
    //             success: true,
    //             errorCode: null,
    //             message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
    //             data: redisData,
    //         }));
    //     }
    // }

    const restaurant: any = await Restaurant.findById(id)
        .populate('menu_id')
        .lean()
        .exec();

    if (!restaurant) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null,
        }));
    }

    const currentDateUnix = Math.floor(new Date().getTime());

    const [restaurantHours, taxRates, promotionData, deliveryZone, cart, pauseServices] = await Promise.all([
        RestaurantHours.find({ restaurant_id }).lean().exec(),
        TaxRates.find({ restaurant_id, is_deleted: false }).lean().exec(),
        Promotion.find({ is_deleted: false, menu_id: restaurant.menu_id, is_active: true }).lean().exec(),
        DeliveryZone.find({ restaurant_id }).lean().exec(),
        Cart.countDocuments({ tracker }).lean().exec(),
        PauseServices.find({ restaurant_id, start_date: { $lte: currentDateUnix }, end_date: { $gte: currentDateUnix } }).lean().exec(),
    ]);

    const categoriesWithDetails = await categoriesDetailsForApp(restaurant.menu_id);

    const menu = {
        ...restaurant.menu_id,
        categories: categoriesWithDetails,
    };

    delete restaurant.menu_id;
    restaurant.menu = menu;

    let createTracker;
    let getCustomer;

    let getOrder;
    if (!tracker) {
        const orderId = generateOrderId();
        createTracker = await randomString(10);
        await Order.create({ tracker: createTracker, order_id: orderId, source });
        getOrder = await Order.findOne({ tracker: createTracker }).lean().exec();
    } else {
        getOrder = await Order.findOne({ tracker }).lean().exec();
    }

    const responseData = {
        customer: getCustomer,
        items: cart,
        order: getOrder,
        tracker: createTracker || tracker,
        restaurant,
        restaurant_hours: restaurantHours,
        tax_rates: taxRates,
        delivery_zone: deliveryZone,
        promotions: promotionData,
        pauseServices: pauseServices,
    };

    // await storeRedisData(createTracker || tracker, responseData, 3600);
    // await storeRedisData(createTracker || tracker, responseData, 60);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: responseData,
    }));
});

//verify the domain 
export const verifyDomain = catchAsyncErrors(async (req: Request, res: Response) => {
    const { domain, id } = req.body;
    const domainExists = await verifyDomainExists(domain);

    if (domainExists) {
        await Restaurant.findByIdAndUpdate(id, { is_website_verified: domainExists });
        return res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: MESSAGES.DOMAIN_VERIFIED,
        });
    }

    return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: MESSAGES.NOT_FOUND,
    });
});

export const manageRestaurantServiceSchedules = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id, services, hours, details, is_same_as_opening_hours } = req.body;

    let restaurantHours = await RestaurantHours.findOne({ restaurant_id, services });

    if (restaurantHours) {
        restaurantHours.services = services || restaurantHours.services;
        restaurantHours.hours = hours;
        restaurantHours.is_same_as_opening_hours = is_same_as_opening_hours;

    } else {
        restaurantHours = new RestaurantHours({
            restaurant_id,
            services,
            hours,
            details,
            is_same_as_opening_hours
        });
    }

    await restaurantHours.save();

    res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: formatMessage(MESSAGES.UPDATE, "Service schedules"),
        data: restaurantHours,
    });
});

export const getRestaurantServiceSchedules = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id, services } = req.body;

    const restaurantHours = await RestaurantHours.findOne({ restaurant_id, services });
    if (!restaurantHours) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: restaurantHours,
    });
});

export const restaurantServiceSchedules = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id } = req.body;

    const restaurantHours = await RestaurantHours.find({ restaurant_id });
    if (!restaurantHours) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: restaurantHours,
    });
});

export const addTaxRate = catchAsyncErrors(async (req: Request, res: Response) => {
    const { name, tax_rate, restaurant_id } = req.body;

    const taxRate = await TaxRates.create({
        name,
        tax_rate,
        restaurant_id
    });

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Tax rate"),
        data: taxRate,
    }));
});

export const getAllTaxRates = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id } = req.body;

    const taxRates = await TaxRates.find({ restaurant_id, is_deleted: false });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: taxRates,
    }));
});

export const editTaxRate = catchAsyncErrors(async (req: Request, res: Response) => {
    const { name, tax_rate, id, } = req.body;

    const taxRate = await TaxRates.findOneAndUpdate(
        { _id: id },
        {
            name,
            tax_rate
        },
        { new: true, }
    );

    if (!taxRate) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ success: false, message: MESSAGES.NOT_FOUND });
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Tax rate"),
        data: taxRate,
    }));
});

export const deleteTaxRate = catchAsyncErrors(async (req: Request, res: Response) => {
    const { id } = req.body;

    const existingInItem = await Item.find({ is_deleted: false, tax_category_id: id });

    if (existingInItem && existingInItem?.length > 0) {
        return res.status(STATUS_CODES.CONFLICT).json(createResponse({
            statusCode: STATUS_CODES.CONFLICT,
            success: false,
            message: MESSAGES.ASSOCIATE_RECORD_NOT_DELETED,
        }));
    }

    await TaxRates.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
    );

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Tax rate"),
    }));
});

export const handleDocument = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, type, payload } = req.body;

    const Model = getModelByType(type);
    if (!Model || !payload) {
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.BAD_REQUEST,
        }));
    }

    let document;

    if (id) {
        document = await Model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    } else {
        document = await Model.create(payload);
    }

    if (!document) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;
    const modelName: string = Model?.modelName?.charAt(0).toUpperCase() + Model?.modelName?.slice(1);

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, modelName),
        data: document,
    }));
});

export const getDocumentById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, type } = req.body;

    const Model = getModelByType(type);
    if (!type) {
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.BAD_REQUEST,
        }));
    }

    let document = await Model.findById(id);

    if (!document) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: document,
    }));
});

export const managePauseServices = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    let menu;

    const updateData: any = { ...req.body };

    // Check for overlapping pause services based on start_date and end_date
    const existingRecords = await PauseServices.find({
        restaurant_id: updateData.restaurant_id,
        $and: [
            {
                $or: [
                    {
                        start_date: { $lt: updateData?.end_date }, // Existing start_date is before the new end_date
                        end_date: { $gt: updateData?.start_date }  // Existing end_date is after the new start_date
                    }
                ]
            },
            {
                // Exclude the current record if editing
                _id: { $ne: id } // Ensure the current record is not included in the overlap check
            }
        ]
    });

    // If there is any conflict with existing records, return an error
    if (existingRecords.length > 0) {
        console
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: 'The provided date range conflicts with an existing pause service.',
            data: null
        }));
    }

    if (id) {
        menu = await PauseServices.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        menu = await PauseServices.create(updateData);
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "Pause services"),
        data: menu,
    }));
});

export const getPauseServices = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    let document = await PauseServices.find({ restaurant_id })

    if (!document) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: document,
    }));
});

export const deletePauseServices = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    let document = await PauseServices.findByIdAndDelete(id)

    if (!document) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "Pause services"),
    }));
});

export const getRestaurantStripe = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const restaurantData: any = await Restaurant.findById(id).select("+stripe_key stripe_accountId stripe_frontend_key")

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: {
            web_key: restaurantData?.stripe_key || null,
            app_key: restaurantData?.stripe_frontend_key || null,
            web_account_id: restaurantData?.stripe_accountId || null,
        }
    }));
});

export const fetchPrivacyAndTerms = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.body;
    const restaurant = await Restaurant.findOne({ _id: id }, { company: 1 }).lean().exec();

    if (!restaurant) {
        return res.status(STATUS_CODES.NOT_FOUND)
            .json({
                success: false,
                statusCode: STATUS_CODES.NOT_FOUND,
                message: MESSAGES.NOT_FOUND
            });
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: restaurant
    }));
});
