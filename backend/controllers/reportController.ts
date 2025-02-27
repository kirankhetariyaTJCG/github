// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';
import mongoose from "mongoose";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Customer from '@Models/customerSchema';
import Order from '@Models/orderSchema';

// Utils and Helpers
import { createResponse } from '@Utils/function';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';

export const customerOrderSummary = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id, search, start_date, end_date, page = 1, limit = 10
    } = req.body;

    const pageNumber = parseInt(page as unknown as string, 10);
    const pageLimit = parseInt(limit as unknown as string, 10);
    const skip = (pageNumber - 1) * pageLimit;

    let filter: any = {
        is_deleted: false
    };

    if (restaurant_id) filter['restaurant_id'] = restaurant_id;
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        filter['$or'] = [
            { name: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
            { phone: { $regex: searchRegex } },
        ];
    }

    if (start_date && end_date) {
        filter['createdAt'] = { $gte: new Date(start_date), $lte: new Date(end_date) };
    }

    const recordCount = await Customer.countDocuments(filter)
    const customerData: any = await Customer.find(filter)
        .skip(skip)
        .limit(pageLimit)
        .sort({ createdAt: -1 });
    const customerSummary = [];

    for (const customer of customerData) {
        const lastOrder = await Order.findOne({ customer: customer._id }, { order_date: 1 }).sort({ order_date: -1 });
        const totalOrders = await Order.countDocuments({ customer: customer._id });
        const totalSpent = await Order.aggregate([
            { $match: { customer: customer._id, payment_status: 1 } },
            { $group: { _id: null, totalSpent: { $sum: '$total_price' } } }
        ]);

        const updatedCustomer = {
            ...customer.toObject(),
            last_order_date: lastOrder?.order_date || null,
            total_orders: totalOrders,
            total_spent: totalSpent.length > 0 ? totalSpent[0].totalSpent : 0
        };
        customerSummary.push(updatedCustomer);
    }

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: customerSummary,
        record_count: recordCount,
    }));
});

// export const categoryItemSalesData = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
//     const { restaurant_id, type, search, start_date, end_date, page = 1, limit = 10 } = req.body;

//     if (!restaurant_id || !type) {
//         return res.status(STATUS_CODES.BAD_REQUEST).json(
//             createResponse({
//                 statusCode: STATUS_CODES.BAD_REQUEST,
//                 success: false,
//                 message: MESSAGES.BAD_REQUEST,
//                 data: [],
//             })
//         );
//     }

//     const pageNumber = parseInt(page as unknown as string, 10);
//     const pageLimit = parseInt(limit as unknown as string, 10);
//     const skip = (pageNumber - 1) * pageLimit;

//     let filter: any = { restaurant_id };

//     if (start_date && end_date) {
//         filter['createdAt'] = {
//             $gte: new Date(parseInt(start_date, 10)),
//             $lte: new Date(parseInt(end_date, 10)),
//         };
//     }

//     try {
//         const orders: any = await Order.find(filter)
//             .populate({
//                 path: 'items.menu_item_id',
//                 populate: {
//                     path: 'category_id',
//                     select: 'name',
//                 },
//             })
//             .skip(skip)
//             .limit(pageLimit)
//             .sort({ createdAt: -1 });

//         const totalOrders = await Order.countDocuments(filter);

//         const salesData: any[] = [];
//         let totalRevenue = 0;

//         if (orders.length > 0) {
//             totalRevenue = orders.reduce(
//                 (sum: number, order: { sub_total: number }) => sum + (order.sub_total || 0),
//                 0
//             );
//         }

//         if (type === 1) {
//             const categoryOrderCount: Record<string, { totalOrders: number; _id: string }> = {};

//             orders.forEach((order: any) => {
//                 order.items.forEach((item: any) => {
//                     const categoryName = item.menu_item_id?.category_id?.name;
//                     const categoryId = item.menu_item_id?.category_id?._id;

//                     if (categoryName) {
//                         if (!categoryOrderCount[categoryName]) {
//                             categoryOrderCount[categoryName] = { totalOrders: 0, _id: categoryId };
//                         }
//                         categoryOrderCount[categoryName].totalOrders += 1;
//                     }
//                 });
//             });

//             for (const [categoryName, { totalOrders, _id }] of Object.entries(categoryOrderCount)) {
//                 if (!search || categoryName.toLowerCase().includes(search.toLowerCase())) {
//                     salesData.push({
//                         category_name: categoryName,
//                         total_orders: totalOrders,
//                         total_revenue: totalRevenue,
//                         _id,
//                     });
//                 }
//             }
//         } else if (type === 2) {
//             const itemOrderCount: Record<string, { count: number; category_name: string; _id: string }> = {};

//             orders.forEach((order: any) => {
//                 order.items.forEach((item: any) => {
//                     const itemName = item.menu_item_id?.name;
//                     const categoryName = item.menu_item_id?.category_id?.name;
//                     const menuId = item.menu_item_id?._id;

//                     if (itemName && categoryName) {
//                         if (!itemOrderCount[itemName]) {
//                             itemOrderCount[itemName] = { count: 0, category_name: categoryName, _id: menuId };
//                         }
//                         itemOrderCount[itemName].count += 1;
//                     }
//                 });
//             });

//             for (const [itemName, { count, category_name, _id }] of Object.entries(itemOrderCount)) {
//                 if (!search || itemName.toLowerCase().includes(search.toLowerCase()) || category_name.toLowerCase().includes(search.toLowerCase())) {
//                     salesData.push({
//                         item_name: itemName,
//                         category_name: category_name,
//                         total_orders: count,
//                         total_revenue: totalRevenue,
//                         _id,
//                     });
//                 }
//             }
//         } else {
//             return res.status(STATUS_CODES.BAD_REQUEST).json(
//                 createResponse({
//                     statusCode: STATUS_CODES.BAD_REQUEST,
//                     success: false,
//                     message: MESSAGES.BAD_REQUEST,
//                     data: [],
//                 })
//             );
//         }

//         const filteredCount = salesData.length;

//         return res.status(STATUS_CODES.SUCCESS).json(
//             createResponse({
//                 statusCode: STATUS_CODES.SUCCESS,
//                 success: true,
//                 errorCode: null,
//                 message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
//                 data: salesData,
//                 record_count: filteredCount,
//             })
//         );
//     } catch (error) {
//         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
//             createResponse({
//                 statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
//                 success: false,
//                 message: MESSAGES.INTERNAL_SERVER_ERROR,
//                 data: [],
//             })
//         );
//     }
// });

export const categoryItemSalesData = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id, type, search, start_date, end_date, page = 1, limit = 10 } = req.body;

    if (!restaurant_id || !type) {
        return res.status(STATUS_CODES.BAD_REQUEST).json(
            createResponse({
                statusCode: STATUS_CODES.BAD_REQUEST,
                success: false,
                message: MESSAGES.BAD_REQUEST,
                data: [],
            })
        );
    }

    const pageNumber = parseInt(page as unknown as string, 10);
    const pageLimit = parseInt(limit as unknown as string, 10);
    const skip = (pageNumber - 1) * pageLimit;

    let dateFilter: any = {};
    if (start_date && end_date) {
        dateFilter['createdAt'] = {
            $gte: new Date(parseInt(start_date, 10)),
            $lte: new Date(parseInt(end_date, 10)),
        };
    }

    try {
        const matchFilter: any = {
            restaurant_id: new mongoose.Types.ObjectId(restaurant_id),
            ...dateFilter,
        };

        const pipeline: any[] = [
            { $match: matchFilter },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "items",
                    localField: "items.menu_item_id",
                    foreignField: "_id",
                    as: "menu_item",
                },
            },
            { $unwind: "$menu_item" },
            {
                $lookup: {
                    from: "categories",
                    localField: "menu_item.category_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $group: {
                    _id: type === 1 ? "$category._id" : "$menu_item._id",
                    name: { $first: type === 1 ? "$category.name" : "$menu_item.name" },
                    category_name: { $first: "$category.name" },
                    total_orders: { $sum: 1 },
                    total_revenue: { $sum: "$sub_total" },
                },
            },
            {
                $match: search
                    ? {
                        $or: [
                            { name: { $regex: search, $options: "i" } },
                            { category_name: { $regex: search, $options: "i" } },
                        ],
                    }
                    : {},
            },
            { $sort: { total_orders: -1 } },
            { $skip: skip },
            { $limit: pageLimit },
        ];

        const totalRecordsPipeline = [...pipeline];
        totalRecordsPipeline.splice(-3, 3);
        totalRecordsPipeline.push({ $count: "record_count" });

        const [salesData, totalRecords] = await Promise.all([
            Order.aggregate(pipeline),
            Order.aggregate(totalRecordsPipeline),
        ]);

        const recordCount = totalRecords[0]?.record_count || 0;

        return res.status(STATUS_CODES.SUCCESS).json(
            createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                errorCode: null,
                message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
                data: salesData,
                record_count: recordCount,
            })
        );
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
            createResponse({
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                success: false,
                message: MESSAGES.INTERNAL_SERVER_ERROR,
                data: [],
            })
        );
    }
});