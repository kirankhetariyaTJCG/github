// Core and Third-Party Libraries
import { NextFunction, Request, Response } from "express";

// Middleware
import { catchAsyncErrors } from "@Middleware/catchAsyncErrors";

// Models
import Cuisine from "@Models/cuisineSchema";
import DefaultCuisine from "@Models/defaultCuisineSchema";

// Utils and Helpers
import { createResponse, formatMessage } from "@Utils/function";
import { uploadFile } from "@Utils/multer";
import ErrorHandler from "@Utils/errorHandler";
import { MESSAGES, STATUS_CODES } from "@Utils/constant";

export const addCuisine = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { cuisine_name, is_popular, is_default, restaurant_id, cuisine_id, cuisine_image } = req.body;

    let cuisineData: any = {
        restaurant_id,
        cuisine_name,
        cuisine_image: req.file?.path,
        is_popular,
        is_default,
    };

    if (cuisine_id) {
        const getDefaultCuisine: any = await DefaultCuisine.findById(cuisine_id)
        if (!getDefaultCuisine) {
            return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                statusCode: STATUS_CODES.NOT_FOUND,
                success: false,
                message: MESSAGES.NOT_FOUND,
                data: null,
            }));
        }

        cuisineData = {
            restaurant_id: getDefaultCuisine.restaurant_id,
            cuisine_name: getDefaultCuisine?.cuisine_name,
            cuisine_image: getDefaultCuisine?.cuisine_image,
            is_popular: getDefaultCuisine?.is_popular,
            cuisine_id: getDefaultCuisine?._id,
            is_default: true,
        };
    }

    const newCuisine = new Cuisine(cuisineData);
    const savedCuisine = await newCuisine.save();

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.CREATE, "Cuisine"),
        data: savedCuisine,
    }));
});


export const deleteCuisine = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deletedCuisine = await Cuisine.findByIdAndUpdate(
        id,
        { is_deleted: true },
    );;

    if (!deletedCuisine) {
        return next(new ErrorHandler(MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST));
    }

    if (!deletedCuisine?.is_default) {
        await uploadFile.deleteFile(deletedCuisine?.cuisine_image)
    }
    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "Cuisine"),
    }));
});

export const editCuisine = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { cuisine_name, is_popular, is_default, id } = req.body;

    const cuisine = await Cuisine.findOne({ _id: id });
    if (!cuisine || cuisine.is_deleted) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    let cuisine_image = cuisine.cuisine_image;
    if (req?.file?.path) {
        await uploadFile.deleteFile(cuisine_image);
        cuisine_image = req.file.path;
    }

    const updatedCuisine = await Cuisine.findByIdAndUpdate(
        id,
        {
            cuisine_name,
            cuisine_image,
            is_popular,
            is_default,
        },
        { new: true }
    );

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "Cuisine"),
        data: updatedCuisine,
    }));
});


export const fetchCuisines = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const cuisines = await Cuisine.find({
        restaurant_id,
        is_deleted: false
    });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: cuisines,
    }));
});

export const manageDefaultCuisine = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;

    const updateData = { ...req.body, cuisine_image: newImagePath || req.body.cuisine_image };

    if (id) {
        const existingCuisine = await DefaultCuisine.findById(id);
        if (!existingCuisine) {
            return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                statusCode: STATUS_CODES.NOT_FOUND,
                success: false,
                message: MESSAGES.NOT_FOUND,
                data: null,
            }));
        }

        if (newImagePath && existingCuisine.cuisine_image) {
            await uploadFile.deleteFile(existingCuisine.cuisine_image);
        }

        const updatedCuisine = await DefaultCuisine.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        return res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: formatMessage(MESSAGES.UPDATE, "Default cuisine"),
            data: updatedCuisine,
        }));
    }

    const newCuisine = await DefaultCuisine.create(updateData);

    return res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Default cuisine"),
        data: newCuisine,
    }));
});

export const fetchDefaultCuisine = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const cuisines = await DefaultCuisine.find({
        restaurant_id,
        is_deleted: false
    });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: cuisines,
    }));
});