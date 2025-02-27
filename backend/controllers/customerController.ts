// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';

// Utils and Helpers
import ErrorHandler from '@Utils/errorHandler';
import { createCustomerToken, createJWTToken, createResponse, formatMessage } from '@Utils/function';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Customer from '@Models/customerSchema';
import Order from '@Models/orderSchema';

export const registerCustomer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, password, source } = req.body;

    const existingUser = await Customer.findOne({ email, is_deleted: false }).lean();
    if (existingUser) {
        return res.status(STATUS_CODES.CONFLICT).json(createResponse({
            statusCode: STATUS_CODES.CONFLICT,
            success: false,
            message: formatMessage(MESSAGES.ALREADY_EXISTS, "Email"),
            data: null
        }));
    }

    const newCustomer = await Customer.create({
        first_name,
        last_name,
        email,
        password,
        source,
    });

    const customerData: any = {
        _id: newCustomer._id,
        first_name: newCustomer?.first_name,
        last_name: newCustomer?.last_name,
        email: newCustomer?.email,
    }

    const accessToken = createCustomerToken(customerData)
    const refreshToken = createJWTToken(newCustomer._id);

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Your profile"),
        data: {
            ...customerData,
            accessToken,
            refreshToken,
        },
    }));
});

export const loginCustomer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email, is_deleted: false }).select("+password");
    if (!customer) {
        return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED));
    }

    // const isPasswordMatched = await customer.comparePassword(password);
    // if (!isPasswordMatched) {
    //     return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED));
    // }

    const customerData: any = {
        _id: customer._id,
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        email: customer?.email,
    }

    const accessToken = createCustomerToken(customerData)
    const refreshToken = createJWTToken(customer._id);

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: MESSAGES.LOGIN_SUCCESS,
        data: { ...customerData, accessToken, refreshToken },
    }));
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.LOGOUT_SUCCESS,
    }));
});

export const updateCustomerProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, user_id } = req.body;

    // Find the customer by ID
    const customer = await Customer.findById({ _id: user_id });

    if (!customer) {
        return next(new ErrorHandler("Customer not found", 404));
    }

    // Update customer fields
    if (first_name) customer.first_name = first_name; // Adjust field name if necessary
    if (last_name) customer.last_name = last_name; // Adjust field name if necessary

    // Handle profile image upload
    // if (req?.file && req?.file?.path) {
    //     await uploadFile.deleteFile(customer?.profile_image)
    //     customer.profile_image = req.file.path;
    // }

    // Save the updated customer profile
    await customer.save();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "Customer profile"),
        data: {
            _id: customer._id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            profile_image: customer.profile_image,
            email: customer.email,
        },
    }));
});

export const deleteCustomer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;

    const customer = await Customer.findById(user_id);
    if (!customer) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    customer.is_deleted = true
    await customer.save();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "Customer"),
    }));
});

export const customerList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body

    let filter: any = {
        is_deleted: false
    }
    if (restaurant_id) filter['restaurant_id'] = restaurant_id

    const userData = await Customer.find(filter);

    const totalClients = await Customer.countDocuments(filter);

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: userData,
        record_count: totalClients
    }));
});

export const getCustomerById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body
    const userData = await Customer.findById(user_id);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: userData,
    }));
});

export const manageCustomer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, tracker } = req.body;

    let customer;
    const reqData = { ...req.body };
    const existingCustomer = await Customer.findOne({
        $or: [
            { email: email },
            { tracker: tracker }
        ]
    });

    if (existingCustomer) {
        customer = await Customer.findByIdAndUpdate(existingCustomer._id, reqData, { new: true, runValidators: true });
    } else {
        customer = await Customer.create(reqData);
    }

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Customer"),
        data: customer,
    }));
})

export const setCustomer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const reqData = { ...req.body };
    const customer = await Customer.create(reqData);
    await Order.findOneAndUpdate({ tracker: reqData.tracker }, { customer: customer._id })

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Customer"),
        data: customer,
    }))
})

export const customerOrderSummary = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    let filter: any = {
        is_deleted: false
    };
    if (restaurant_id) filter['restaurant_id'] = restaurant_id;

    const customerData: any = await Customer.find(filter);

    for (const customer of customerData) {
        const lastOrder = await Order.findOne({ customer: customer._id }).sort({ order_date: -1 });
        const totalOrders = await Order.countDocuments({ customer: customer._id });
        const totalSpent = await Order.aggregate([
            { $match: { customer: customer._id, payment_status: 2 } },
            { $group: { _id: null, totalSpent: { $sum: '$total_price' } } }
        ]);

        customer.last_order_date = lastOrder?.order_date || null;
        customer.total_orders = totalOrders;
        customer.total_spent = totalSpent.length > 0 ? totalSpent[0].totalSpent : 0;
    }

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: customerData,
    }));
});
