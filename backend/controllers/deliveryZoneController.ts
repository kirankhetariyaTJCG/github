// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import DeliveryZone from '@Models/deliveryZoneSchema';

// Utils and Helpers
import { MESSAGES, STATUS_CODES } from '@Utils/constant';
import { formatMessage } from '@Utils/function';

export const viewDeliveryZones = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id, is_active } = req.body

    let filter: any = {
        restaurant_id: restaurant_id
    }

    if (is_active !== undefined && is_active !== null) {
        filter['is_active'] = is_active;
    }
    const deliveryZones = await DeliveryZone.find(filter);

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: deliveryZones,
    });
});

export const viewDeliveryZoneById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deliveryZone = await DeliveryZone.findById(id);

    if (!deliveryZone) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            statusCode: STATUS_CODES.NOT_FOUND,
            message: MESSAGES.NOT_FOUND,
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        data: deliveryZone,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
    });
});

export const addDeliveryZone = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { color, delivery_fee, minimum_order, name, restaurant_id, shape_json, zone_type, usage, active } = req.body;

    const newDeliveryZone = await DeliveryZone.create({
        color,
        delivery_fee,
        minimum_order,
        name,
        restaurant_id,
        shape_json,
        zone_type,
        usage,
        active,
    });

    return res.status(STATUS_CODES.CREATED).json({
        success: true,
        statusCode: STATUS_CODES.CREATED,
        data: newDeliveryZone,
        message: formatMessage(MESSAGES.CREATE, "Delivery Zone"),
    });
});


export const editDeliveryZone = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, ...updateData } = req.body;

    const updatedDeliveryZone = await DeliveryZone.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedDeliveryZone) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            statusCode: STATUS_CODES.NOT_FOUND,
            message: MESSAGES.NOT_FOUND,
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        data: updatedDeliveryZone,
        message: formatMessage(MESSAGES.UPDATE, "Delivery Zone"),
    });
});

export const deleteDeliveryZone = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deletedDeliveryZone = await DeliveryZone.findByIdAndDelete(id);

    if (!deletedDeliveryZone) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            statusCode: STATUS_CODES.NOT_FOUND,
            message: MESSAGES.NOT_FOUND,
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        statusCode: STATUS_CODES.SUCCESS,
        message: formatMessage(MESSAGES.DELETE, "Delivery Zone"),
    });
});