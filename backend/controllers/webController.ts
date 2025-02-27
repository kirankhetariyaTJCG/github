// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Order from '@Models/orderSchema';
import Restaurant from '@Models/restaurantSchema';
import User from '@Models/userSchema';
import MobileHistory from '@Models/mobileHistorySchema';

// Utils and Helpers
import { categoriesDetailsForApp, createJWTToken, createResponse, createUserToken, sendMail } from '@Utils/function';
import { constants, MESSAGES, STATUS_CODES } from '@Utils/constant';
import ErrorHandler from '@Utils/errorHandler';
import { appDownloadEmail } from '@Utils/emailTemplate';

export const fetchMenuDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { menu_id } = req.body;

    if (!menu_id) {
        return res.status(400).json(createResponse({
            statusCode: 400,
            success: false,
            errorCode: 'MENU_ID_REQUIRED',
            message: 'Menu ID is required',
            data: null,
        }));
    }

    const detailedCategories = await categoriesDetailsForApp(menu_id);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: detailedCategories,
    }));
});

export const fetchOrderHistory = catchAsyncErrors(async (req: Request, res: Response) => {
    const { menu_id, restaurant_id, page = 1, limit = 10, order_status } = req.body

    let filter: any = {}
    if (menu_id) filter['menu_id'] = menu_id
    if (restaurant_id) filter['restaurant_id'] = restaurant_id
    if (order_status) {
        filter['order_status'] = order_status
    } else {
        filter['order_status'] = { '$nin': [0, 1] }
    }

    const pageNumber = parseInt(page as unknown as string, 10);
    const pageLimit = parseInt(limit as unknown as string, 10);
    const skip = (pageNumber - 1) * pageLimit;

    const orders = await Order.find(filter, { payment_details: 0, token: 0, payment_link: 0, payment_intent_id: 0 })
        .populate({
            path: 'customer',
            select: 'tracker first_name last_name email phone billing_details addresses'
        })
        .populate({
            path: 'items.menu_item_id',
            select: 'name description price image'
        })
        .populate({
            path: 'items.size_id',
            select: 'name price'
        })
        .populate({
            path: 'items.choices_array',
            select: 'name price'
        })
        .skip(skip)
        .limit(pageLimit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();

    const totalOrders = await Order.countDocuments(filter);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        record_count: totalOrders,
        data: orders,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY
    }));
});

export const mobileUserLogin = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, device_name, os, os_version, app, app_version } = req.body;

    const user = await User.findOne({ email, is_deleted: false }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED));
    }

    const restaurant = await Restaurant.findOne({ user_id: user._id });
    if (!restaurant) {
        return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED));
    }

    const userTokenData = {
        id: user._id,
        email: user.email || "",
        first_name: user.first_name,
        last_name: user.last_name,
        restaurant_id: restaurant._id
    };

    const accessToken = createUserToken(userTokenData);
    const currentTime = moment().unix();

    await MobileHistory.findOneAndUpdate(
        { restaurant_id: restaurant._id },
        {
            token: accessToken,
            name: device_name,
            os,
            os_version,
            app,
            app_version,
            last_seen_at: currentTime,
            restaurant_id: restaurant._id,
            $addToSet: { user_id: user._id },
        },
        { upsert: true, new: true } // Create a new document if none exists
    );

    return res.status(STATUS_CODES.SUCCESS).json(
        createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.LOGIN_SUCCESS,
            data: {
                user: userTokenData,
                restaurant: restaurant,
                access_token: accessToken,
            },
        })
    );
});

export const fetchPendingOrder = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id, } = req.body

    const orders = await Order.find({
        restaurant_id,
        order_status: 1
    }, { payment_details: 0, token: 0, payment_link: 0, payment_intent_id: 0 })
        .populate({
            path: 'customer',
            select: 'tracker first_name last_name email phone billing_details addresses'
        })
        .populate({
            path: 'items.menu_item_id',
            select: 'name description price image'
        })
        .populate({
            path: 'items.size_id',
            select: 'name price'
        })
        .populate({
            path: 'items.choices_array',
            select: 'name price'
        })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        data: orders ?? [],
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY
    }));
});

export const fetchLoginMobileHistory = catchAsyncErrors(async (req: Request, res: Response) => {
    const { restaurant_id } = req.body

    const orders = await MobileHistory.findOne({ restaurant_id }, { token: 0 })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        data: orders ?? {},
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY
    }));
});


// send order tracking App download link
export const sendAppLink = catchAsyncErrors(async (req: Request, res: Response) => {
    const { email } = req.body

    const emailBody = await appDownloadEmail({ companyName: constants.COMPANY_NAME, });
    await sendMail(
        email,
        emailBody,
        `${constants.COMPANY_NAME} Order Taking App Download`
    );


    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.EMAIL_SENT_SUCCESS
    }));
});