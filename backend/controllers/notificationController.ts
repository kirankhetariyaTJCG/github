// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Campaign from '@Models/campaignSchema';
import Customer from '@Models/customerSchema';
import Order from '@Models/orderSchema';

// Utils and Helpers
import { createResponse, formatMessage } from '@Utils/function';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';

export const manageCampaign = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { step, id, invite_type, restaurant_id, promotion_id, name, subject, body, scheduled, customer } = req.body;

    let campaign: any

    if (step === 1) {
        if (id) {
            campaign = await Campaign.findByIdAndUpdate(
                id,
                { invite_type, restaurant_id, promotion_id, name },
                { new: true }
            );
        } else {
            campaign = await Campaign.create({ invite_type, restaurant_id, promotion_id, name });
        }

        if (!campaign) throw new Error(MESSAGES.GENERAL_ERROR)
    }

    if (step === 2) {
        campaign = await Campaign.findById(id);

        if (!campaign) throw new Error(MESSAGES.GENERAL_ERROR)

        campaign.subject = subject;
        campaign.body = body;
        campaign.scheduled = scheduled;

        await campaign.save();
    } else if (step === 3) {
        campaign = await Campaign.findById(id);

        if (!campaign) throw new Error(MESSAGES.GENERAL_ERROR)

        const keyField = invite_type === 1 ? "email" : "phone";

        const invalidData = invite_type === 1
            ? customer.filter((email: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            : customer.filter((phone: string) => !/^[0-9]{10}$/.test(phone));

        if (invalidData?.length > 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.BAD_REQUEST,
            });
        }

        const existingCustomers = await Customer.find({ [keyField]: { $in: customer } }).select(keyField);
        const existingData = existingCustomers.map((cus: any) => cus[keyField]);

        const duplicateData = customer.filter((data: string) => existingData.includes(data));
        const newData = customer.filter((data: string) => !existingData.includes(data));

        if (newData?.length > 0) {
            const hashedPassword = await bcrypt.hash('Demo@1234', 10);

            const newCustomers = newData.map((data: string) => ({
                [keyField]: data,
                password: hashedPassword,
                campaign_id: campaign._id,
            }));

            const savedCustomers = await Customer.insertMany(newCustomers);
            campaign.saved_customers.push(...savedCustomers.map((cus) => cus._id));

            campaign.customer.push(...customer);
            await campaign.save();
        }

        return res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
            data: {
                campaign,
                duplicate_count: duplicateData.length,
                stored_count: newData.length,
                // duplicateData,
                // storedData: newData,
            },
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
        data: campaign,
    });
});

// export const campaignList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
//     const { restaurant_id } = req.body;

//     const campaignData = await Campaign.find({ restaurant_id });
//     let campaignDetails = [];

//     if (campaignData?.length > 0) {
//         for (const iterator of campaignData) {
//             const customerList = await Customer.find({
//                 campaign_id: iterator._id,
//                 is_deleted: false
//             }).select('email profile_image unsubscribed is_send_invitations');

//             let totalOrdersPlaced = 0; // Total orders placed by customers
//             let totalOrdersPlacedValue = 0; // Amount of all orders placed
//             let totalOrdersAccepted = 0; // Total accepted orders
//             let totalOrdersAcceptedValue = 0; // Amount of accepted orders
//             let sentInvitationCount = 0;

//             for (const customer of customerList) {
//                 if (customer.is_send_invitations) {
//                     sentInvitationCount++;
//                 }

//                 const customerOrders = await Order.find({ user_id: customer._id });

//                 totalOrdersPlaced += customerOrders.length;
//                 totalOrdersPlacedValue += customerOrders.reduce((total, order) => total + order.total_price, 0);

//                 const customerAcceptedOrders = await Order.find({
//                     user_id: customer._id,
//                     order_status: 4
//                 });

//                 totalOrdersAccepted += customerAcceptedOrders.length;
//                 totalOrdersAcceptedValue += customerAcceptedOrders.reduce((total, order) => total + order.total_price, 0);
//             }

//             campaignDetails.push({
//                 ...iterator.toObject(),
//                 customer_list: customerList,
//                 count_customer: customerList.length,
//                 sent_invitation_count: sentInvitationCount,
//                 total_orders_placed: totalOrdersPlaced,
//                 total_orders_placed_value: totalOrdersPlacedValue,
//                 total_orders_accepted: totalOrdersAccepted,
//                 total_orders_accepted_value: totalOrdersAcceptedValue
//             });
//         }
//     }

//     return res.status(STATUS_CODES.SUCCESS).json(createResponse({
//         statusCode: STATUS_CODES.SUCCESS,
//         success: true,
//         errorCode: null,
//         message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
//         data: campaignDetails,
//     }));
// });

export const campaignList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const campaignData = await Campaign.find({ restaurant_id })
        .sort({ createdAt: -1 })
        .populate('saved_customers', 'email profile_image unsubscribed is_send_invitations');

    let campaignDetails = [];

    if (campaignData?.length > 0) {
        for (const iterator of campaignData) {
            const customerList: any = iterator.saved_customers;

            let totalOrdersPlaced = 0;
            let totalOrdersPlacedValue = 0;
            let totalOrdersAccepted = 0;
            let totalOrdersAcceptedValue = 0;
            let sentInvitationCount = 0;

            for (const customer of customerList) {
                if (customer.is_send_invitations) {
                    sentInvitationCount++;
                }

                const customerOrders = await Order.find({ user_id: customer._id });

                totalOrdersPlaced += customerOrders.length;
                totalOrdersPlacedValue += customerOrders.reduce((total, order) => total + order.total_price, 0);

                const customerAcceptedOrders = await Order.find({
                    user_id: customer._id,
                    order_status: 4
                });

                totalOrdersAccepted += customerAcceptedOrders.length;
                totalOrdersAcceptedValue += customerAcceptedOrders.reduce((total, order) => total + order.total_price, 0);
            }

            campaignDetails.push({
                ...iterator.toObject(),
                count_customer: customerList.length,
                sent_invitation_count: sentInvitationCount,
                total_orders_placed: totalOrdersPlaced,
                total_orders_placed_value: totalOrdersPlacedValue,
                total_orders_accepted: totalOrdersAccepted,
                total_orders_accepted_value: totalOrdersAcceptedValue
            });
        }
    }

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: campaignDetails,
    }));
});

