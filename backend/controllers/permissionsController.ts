// Core and Third-Party Libraries
import { NextFunction, Request, Response } from "express";

// Middleware
import { catchAsyncErrors } from "@Middleware/catchAsyncErrors";

// Models
import Permissions from "@Models/permissionsSchema";

// Utils and Helpers
import { createResponse, formatMessage } from "@Utils/function";
import { MESSAGES, STATUS_CODES, PERMISSION } from "@Utils/constant";
import Restaurant from "@Models/restaurantSchema";
import User from "@Models/userSchema";

export const addPermissions = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    await Permissions.insertMany(PERMISSION, { ordered: true });

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
    }));
});

export const fetchPermissions = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const permissionsData = await Permissions.find()

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: permissionsData
    }));
});


export const assignPermissions = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { user_id, permissions } = req.body;

    await User.updateOne(
        { _id: user_id },
        { $set: { is_active: false, permissions } }
    );

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.PERMISSIONS_ASSIGNED,
    }));
});

