// Core and Third-Party Libraries
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import moment from "moment";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Promotion from "@Models/promotionSchema";
import Cart from "@Models/cartSchema";
import Order from "@Models/orderSchema";
import Customer from "@Models/customerSchema";
import Restaurant from "@Models/restaurantSchema";

// Utils and Helpers
import { applyPromotion, createLogs, createResponse, formatMessage, generateCouponCode, paymentMethodMap, sendMail } from "@Utils/function";
import { uploadFile } from "@Utils/multer";
import { MESSAGES, STATUS_CODES } from "@Utils/constant";
import { userRequest } from "@Utils/customInterface";

// Email Templates
import { newOrderMail, orderCancelledEmail, orderConfirmationEmail, orderDeliveredEmail, orderShippedEmail, } from "@Utils/emailTemplate";

// Stripe Configuration and Functions
import { addCardToCustomer, createCustomer, createPaymentIntent, createStripePaymentLink, refundAmount, retrieveChargeInfo, } from "@Config/stripe";


export const managePromotion = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, isDeleted, custom_coupon } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;

    const updateData = { ...req.body, promotion_image: newImagePath };

    if (id) {
        const existingPromotion = await Promotion.findById(id);
        if (!existingPromotion) {
            return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                statusCode: STATUS_CODES.NOT_FOUND,
                success: false,
                message: MESSAGES.NOT_FOUND,
                data: null,
            }));
        }

        if (newImagePath && existingPromotion?.promotion_image) {
            await uploadFile.deleteFile(existingPromotion.promotion_image);
            updateData['promotion_image'] = newImagePath
        }

        if (isDeleted) {
            updateData['is_deleted'] = true
            uploadFile.deleteFile(existingPromotion?.promotion_image);
        }

        const updatedPromotion = await Promotion.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        return res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: formatMessage(MESSAGES.UPDATE, "Promotion"),
            data: updatedPromotion,
        }));
    }

    if (!custom_coupon) {
        updateData['coupon_code'] = await generateCouponCode()
    }
    const newCuisine = await Promotion.create(updateData);

    return res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Promotion"),
        data: newCuisine,
    }));
});

export const getPromotionData = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { menu_id, system, page = 1, limit = 10 } = req.body;

    const pageNumber = parseInt(page as unknown as string, 10);
    const pageLimit = parseInt(limit as unknown as string, 10);
    const skip = (pageNumber - 1) * pageLimit;

    let filter: any = {
        is_deleted: false
    }

    if (menu_id) filter['menu_id'] = menu_id
    if (system) filter['system'] = system

    const promotionData = await Promotion.find(filter)
        .skip(skip)
        .limit(pageLimit);
    const recordCount = await Promotion.countDocuments(filter)

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: promotionData,
        record_count: recordCount,
    }));
});


export const promotionDropdown = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const promotionData = await Promotion.find({ is_deleted: false, is_active: true, restaurant_id }, {
        name: 1, promotion_image: 1
    })

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: promotionData,
    }));
});

export const applyCoupon = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id, coupon_code, cart_value, cart_items, customer_id, payment_methods, delivery_zone, custom_selection, order_type, client_type } = req.body;

    if (!coupon_code) {
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.INVALID_COUPON_CODE,
        }));
    }

    const promotionData = await Promotion.findOne({
        is_deleted: false,
        restaurant_id,
        '$or': [
            { coupon_code },
            { custom_coupon: coupon_code },
        ],
    });

    if (!promotionData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.COUPON_NOT_FOUND,
        }));
    }

    const result = await applyPromotion(promotionData, cart_items, cart_value, payment_methods, delivery_zone, customer_id, custom_selection, order_type, client_type);

    return res.status(result.statusCode).json(createResponse(result));
});

export const getCart = catchAsyncErrors(async (req: Request, res: Response) => {
    const { tracker } = req.body;

    const cart = await Cart.find({ tracker }).populate([
        {
            path: 'menu_item_id',
            populate: { path: 'tax_category_id', }
        },
        { path: 'size_id' },
        {
            path: 'selected_choices',
            populate: {
                path: 'choice_id',
                model: 'choice'
            }
        },
        { path: 'promotion_id', },
    ])

    if (!cart) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.CART_NOT_FOUND,
            data: null,
            record_count: 0
        }));
    }

    const count = await Cart.countDocuments({ tracker })

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        data: cart,
        record_count: count
    }));
});

export const removeCart = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, user_id } = req.body;

    let deletedCart: any = null

    if (user_id) {
        deletedCart = await Cart.deleteMany({ user_id });
    } else {
        deletedCart = await Cart.findOneAndDelete({ _id: id });
    }

    if (!deletedCart) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: user_id ? MESSAGES.ALL_CARTS_REMOVED_SUCCESS : MESSAGES.ITEM_REMOVED_SUCCESS,
    });
});

export const addOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, tracker, order_status } = req.body;

    let orderData;

    try {
        //  Send confirmation email if `order_status` is 1 and `id` is provided
        if (order_status === 1 && id) {
            await Order.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            const existingOrder: any = await Order.findById(id).populate('restaurant_id customer');

            if (!existingOrder) {
                return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                    statusCode: STATUS_CODES.NOT_FOUND,
                    success: false,
                    errorCode: 'ORDER_NOT_FOUND',
                    message: MESSAGES.NOT_FOUND,
                }));
            }

            const restaurantPhones = [
                existingOrder.restaurant_id.phone,
                ...(existingOrder.restaurant_id.additional_phones || []),
            ];

            const mailData = {
                restaurantName: existingOrder.restaurant_id.name,
                orderNumber: existingOrder.order_id,
                customerName: existingOrder.customer.first_name,
                supportPhone: restaurantPhones,
                supportEmail: existingOrder.restaurant_id?.customer?.email,
                websiteLink: existingOrder.restaurant_id.website,
                orderDate: moment().add(30, 'minutes').format('dddd, MMM D, YYYY, h:mm A'),
            };

            const emailBody = await newOrderMail(mailData);

            await sendMail(
                existingOrder.customer.email,
                emailBody,
                `Thank You for Your Order! We'll Be Preparing It Shortly.`
            );

            return res.status(STATUS_CODES.SUCCESS).json(createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                errorCode: null,
                message: 'Thank You for Your Order!',
                data: existingOrder,
            }));
        }

        if (tracker && id) {
            orderData = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });

            if (!orderData) {
                return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                    statusCode: STATUS_CODES.NOT_FOUND,
                    success: false,
                    errorCode: 'ORDER_NOT_FOUND',
                    message: MESSAGES.NOT_FOUND,
                }));
            }

            return res.status(STATUS_CODES.SUCCESS).json(createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                errorCode: null,
                message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
                data: orderData,
            }));
        }

        // If none of the above cases match, return a bad request response
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            errorCode: 'INVALID_REQUEST',
            message: MESSAGES.INVALID_REQUEST,
        }));
    } catch (error) {
        next(error);
    }
});

export const getOrderHistory = catchAsyncErrors(async (req: userRequest, res: Response) => {
    const { customer, menu_id, restaurant_id, start_date, end_date, search, page = 1, limit = 10, order_status, payment_method, } = req.body;

    let filter: any = {};
    if (customer) filter['customer'] = new mongoose.Types.ObjectId(customer);
    if (menu_id) filter['menu_id'] = new mongoose.Types.ObjectId(menu_id);
    if (restaurant_id) filter['restaurant_id'] = new mongoose.Types.ObjectId(restaurant_id);
    if (order_status) filter['order_status'] = order_status;
    if (payment_method) filter['payment_method'] = payment_method;
    if (start_date && end_date) {
        filter['order_date'] = { $gte: start_date, $lte: end_date };
    }

    const pageNumber = parseInt(page as unknown as string, 10);
    const pageLimit = parseInt(limit as unknown as string, 10);
    const skip = (pageNumber - 1) * pageLimit;

    const pipeline: any[] = [
        { $match: filter },
        {
            $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer_info",
            },
        },
        { $unwind: "$customer_info" },
        {
            $match: search
                ? {
                    $or: [
                        { "customer_info.first_name": { $regex: search, $options: "i" } },
                        { "customer_info.last_name": { $regex: search, $options: "i" } },
                        { "customer_info.email": { $regex: search, $options: "i" } },
                    ],
                }
                : {},
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageLimit },
    ];


    const totalOrdersPipeline: any[] = [
        { $match: filter },
        {
            $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer_info",
            },
        },
        { $unwind: "$customer_info" },
        {
            $match: search
                ? {
                    $or: [
                        { "customer_info.first_name": { $regex: search, $options: "i" } },
                        { "customer_info.last_name": { $regex: search, $options: "i" } },
                        { "customer_info.email": { $regex: search, $options: "i" } },
                    ],
                }
                : {},
        },
        { $count: "totalOrders" },
    ];

    try {
        const [orders, totalCountResult] = await Promise.all([
            Order.aggregate(pipeline).exec(),
            Order.aggregate(totalOrdersPipeline).exec(),
        ]);

        const totalOrders = totalCountResult.length > 0 ? totalCountResult[0].totalOrders : 0;

        res.status(STATUS_CODES.SUCCESS).json(
            createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                record_count: totalOrders,
                data: orders,
                message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            })
        );
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
            createResponse({
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                success: false,
                message: MESSAGES.INTERNAL_SERVER_ERROR,
                data: [],
            })
        );
    }
});

export const updateOrderStatus = catchAsyncErrors(async (req: Request, res: Response) => {
    const { status, id, fulfill_time } = req.body;

    const order: any = await Order.findById(id)
        .populate({
            path: 'restaurant_id',
            select: 'name email website phone additional_phones customer address',
        })
        .populate('customer', 'first_name email')
        .populate({
            path: 'items.menu_item_id',
            select: 'name price',
        })
        .populate({
            path: 'items.size_id',
            select: 'name price',
        })
        .populate({
            path: 'items.choices_array',
            select: 'name price',
        });

    if (!order) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    order.order_status = status;
    const currentTime: number = moment().valueOf();

    switch (status) {
        case 2: // Confirmed
            order.confirmed_at = currentTime;
            order.fulfill_time = fulfill_time;
            break;
        case 3: // Shipped
            order.retrieved_at = currentTime;
            break;
        default:
            break;
    }

    await order.save();

    let orderItem: any = order.items.map((item: { menu_item_id: any; size_id: any; choices_array: any; quantity: any; }) => ({

        name: item.menu_item_id.name,
        quantity: item.quantity,
        price: item.size_id?.price ? item.size_id?.price : item?.menu_item_id?.price,
        size: item.size_id ? item.size_id.name : 'N/A',
        choices: item.choices_array && item.choices_array.length > 0
            ? item.choices_array.map((choice: any) => choice.name).join(', ')
            : 'None',
    }))

    const restaurantPhones = [
        order.restaurant_id.phone,
        ...(order.restaurant_id.additional_phones || []),
    ];
    const deliveryAddress = `${order.delivery_address.street_address}, ${order.delivery_address.area ? order.delivery_address.area + ', ' : ''}${order.delivery_address.city}, ${order.delivery_address.state}, ${order.delivery_address.postal_code}, ${order.delivery_address.country}`;

    let mailData: any = {
        restaurantName: order.restaurant_id.name,
        restaurantAddress: order.restaurant_id.address,
        orderNumber: order.order_id,
        customerName: order.customer.first_name,
        supportPhone: restaurantPhones.join(', '),
        supportEmail: order.restaurant_id?.customer?.email,
        websiteLink: order.restaurant_id.website,
        orderDate: moment().format('dddd, MMM D, YYYY, h:mm A'), // pending
        orderItems: orderItem,
        orderType: order.order_type,
        discountAmount: order.discount,
        subTotal: order.sub_total,
        taxRate: order.tax_rate,
        taxAmount: order.tax_amount,
        deliveryTaxes: order.delivery_taxes,
        deliveryFee: order.delivery_fee,
        totalAmount: order.total_price,
        paymentMethod: paymentMethodMap[order.payment_method],
        deliveryAddress: deliveryAddress,
        reservationTime: order.reservation_time,
        reservationDate: order.reservation_date,
        reservationPeople: order.reservation_people,
        preOrderTime: order.pre_order_time,
        preOrderDate: order.pre_order_date,
        taxes: order?.taxes,
    };

    if (status === 2) {
        const body = await orderConfirmationEmail(mailData);
        await sendMail(order.customer.email, body, "Your Order is Confirmed");
    }

    if (status === 3) {
        const body = await orderShippedEmail(mailData);
        await sendMail(order.customer.email, body, "Your Order has been Shipped");
    }

    if (status === 4) {
        const body = await orderDeliveredEmail(mailData);
        await sendMail(order.customer.email, body, "Your Order has been Delivered");
    }

    if (status === 5) {
        const body = await orderCancelledEmail(mailData);
        await sendMail(order.customer.email, body, "Your Order has been Cancelled");

        // Process refund
        try {
            const refundResult = await refundAmount(
                order.restaurant_id._id,
                order.payment_intent_id,
                order.total_price
            );

            order.refund_response = { ...refundResult, refund_date: moment().valueOf() };
            order.refund_status = refundResult ? 2 : 1; // 2: Success, 1: Failed
            await order.save();

            await createLogs({
                message: 'Refund processed for cancelled order',
                request: { order },
                response: refundResult,
                status: "success",
            });
        } catch (refundError) {
            order.refund_status = 1; // Failed
            await order.save();

            await createLogs({
                message: 'Refund failed for cancelled order',
                request: { order },
                response: refundError,
                status: "error",
            });
        }
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        message: MESSAGES.STATUS_CHANGE_SUCCESS,
        data: order,
    });
});

export const findOrderById = catchAsyncErrors(async (req: Request, res: Response) => {
    const { id } = req.body;

    const order: any = await Order.findById(id)
        .populate({
            path: 'restaurant_id',
            select: 'name email website phone additional_phones customer address',
        })
        .populate('customer')
        .populate({
            path: 'items.menu_item_id',
            select: 'name price',
        })
        .populate({
            path: 'items.size_id',
            select: 'name price',
        })
        .populate({
            path: 'items.choices_array',
            select: 'name price',
        });

    if (!order) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }


    return res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: order,
    });
});


export const addToCart = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    let cartData;

    const updateData: any = { ...req.body };

    if (id) {
        cartData = await Cart.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        cartData = await Cart.create(updateData);
    }

    const populatedCart = await cartData?.populate([
        {
            path: 'menu_item_id',
            // select: 'name price description tax_category_id',
            populate: { path: 'tax_category_id', }
        },
        { path: 'size_id' },
        // { path: 'selected_choices' },
        {
            path: 'selected_choices',
            populate: {
                path: 'choice_id',
                model: 'choice'
            }
        },
        { path: 'promotion_id', },
    ]);

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "Cart"),
        data: populatedCart,
    }));
});

export const getPaymentLink = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { amount, currency, description, orderId, restaurant_id } = req.body;

    if (!amount || !currency || !orderId || !restaurant_id) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: MESSAGES.BAD_REQUEST,
        });
    }

    const paymentIntent = await createPaymentIntent(restaurant_id, amount, currency, { orderId });
    const paymentLink = await createStripePaymentLink(restaurant_id, amount, currency, description, orderId);

    await Order.findOneAndUpdate({ order_id: orderId }, {
        payment_intent_id: paymentIntent?.id,
        payment_link: paymentLink.url
    }, { new: true, runValidators: true });


    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: 'Payment link created successfully.',
        data: { url: paymentLink.url },
    }));
});

export const getClientSecret = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { amount, currency, order_id, customer_id, restaurant_id } = req.body;

    if (!amount || !currency || !order_id || !customer_id || !restaurant_id) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            status: false,
            message: MESSAGES.BAD_REQUEST,
        });
    }

    let stripeCusId;
    const customerData: any = await Customer.findById(customer_id);

    if (!customerData) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: true,
            message: MESSAGES.NOT_FOUND
        }));
    }

    const restaurant = await Restaurant.findById(restaurant_id).select("+stripe_key stripe_accountId");

    if (!restaurant || !restaurant.stripe_key || !restaurant.stripe_accountId) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: true,
            message: MESSAGES.PAYMENT_NOT_CONFIGURED
        }));
    }

    if (customerData?.stripe_customer_id) {
        stripeCusId = customerData.stripe_customer_id;
    } else {
        const userName = `${customerData?.first_name} ${customerData?.last_name}`;
        const createCus: any = await createCustomer(restaurant_id, customerData?.email as string, userName);
        stripeCusId = createCus.id;

        customerData.stripe_customer_id = createCus.id;
        await customerData.save();
    }

    const secret = await createPaymentIntent(restaurant_id, amount, currency, {
        order_id: order_id.toString(),
        customer_id,
        stripe_customer_id: stripeCusId,
    }, stripeCusId);

    if (!secret) {
        throw new Error(MESSAGES.BAD_REQUEST)
    }

    await Order.findByIdAndUpdate(order_id, {
        currency,
        token: secret?.client_secret || "",
        payment_intent_id: secret?.id || "",
    });

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: 'Payment intent created successfully.',
        data: { clientSecret: secret?.client_secret },
    }));
});

export const paymentResponse = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { response, token, payment_status, token_id } = req.body;

    if (!token || !payment_status || !response) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            status: false,
            message: 'Missing required fields: token, payment_status or response.',
        });
    }

    let paymentData: any = await Order.findOne({ token })
        .populate('customer')
        .lean()
        .exec();

    if (!paymentData) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            status: false,
            message: 'Order not found.',
        });
    }

    if (!paymentData.customer) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            status: false,
            message: 'Customer data not found.',
        });
    }

    // if (paymentData?.customer?.stripe_customer_id && token_id) {
    //     await addCardToCustomer(paymentData.restaurant_id, paymentData.customer?.stripe_customer_id, token_id)
    // }

    let chargeInfo;
    try {
        chargeInfo = await retrieveChargeInfo(paymentData.restaurant_id, paymentData?.payment_intent_id);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Failed to retrieve charge info.',
        });
    }

    const cardNumber = `**** **** **** ${chargeInfo?.last4Digits || 'N/A'}`;

    await Order.findOneAndUpdate(
        { token },
        {
            order_date: payment_status === 1 ? moment().valueOf() : 0,
            order_status: payment_status === 1 ? 1 : null,
            payment_date: new Date(),
            payment_status,
            payment_details: {
                payment_response: response,
                charge_id: chargeInfo?.chargeId || '',
                balance_transaction: chargeInfo?.balanceTransaction || '',
                last4_digits: cardNumber,
            },
        }
    );

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: 'Payment processed successfully.',
    }));
});
