// Core and Third-Party Libraries
import { NextFunction, Request, Response } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Country from '@Models/countrySchema';
import State from '@Models/stateSchema';
import City from '@Models/citySchema';

// Utils and Helpers
import { createResponse } from '@Utils/function';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';
import ErrorHandler from '@Utils/errorHandler';

export const getAllCountries = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const countries = await Country.find({}, "id name latitude longitude")

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: countries,
    }));
});

export const getStatesByCountryId = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { country_id } = req.body;

    if (!country_id) {
        return next(new ErrorHandler(MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST));
    }

    const states = await State.find({ country_id: Number(country_id) }).select('id name latitude longitude');

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: states,
    }));
});

export const getCitiesByStateAndCountry = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { state_id, country_id } = req.body;

    if (!state_id || !country_id) {
        return next(new ErrorHandler(MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST));
    }

    const cities = await City.find({ state_id: Number(state_id), country_id: Number(country_id) }).select('id name latitude longitude');;

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: cities,
    }));
});