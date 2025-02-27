// Core and Third-Party Libraries
import { NextFunction, Request, Response } from "express";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import ServiceFees from "@Models/serviceFeesSchema";

// Utils and Helpers
import { createResponse, formatMessage } from "@Utils/function";
import { MESSAGES, STATUS_CODES } from "@Utils/constant";


export const manageServiceFees = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, is_deleted, is_active, ...updateData } = req.body;
    let serviceFeesData;

    if (id) {
        if (is_deleted) {
            await ServiceFees.findByIdAndUpdate(id, { is_deleted: true });
            return res.status(STATUS_CODES.SUCCESS).json(createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                errorCode: null,
                message: formatMessage(MESSAGES.DELETE, "Service Fees"),
                data: null,
            }));
        }

        if (is_active !== undefined) {
            serviceFeesData = await ServiceFees.findByIdAndUpdate(id, { is_active }, { new: true });
            return res.status(STATUS_CODES.SUCCESS).json(createResponse({
                statusCode: STATUS_CODES.SUCCESS,
                success: true,
                errorCode: null,
                message: MESSAGES.STATUS_CHANGE_SUCCESS,
                data: serviceFeesData,
            }));
        }

        serviceFeesData = await ServiceFees.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        serviceFeesData = await ServiceFees.create(updateData);
    }

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(id ? MESSAGES.UPDATE : MESSAGES.CREATE, "Service Fees"),
        data: serviceFeesData,
    }));
});

export const fetchServiceFees = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const serviceFeesData = await ServiceFees.find({
        restaurant_id,
        is_deleted: false
    });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: serviceFeesData,
    }));
});