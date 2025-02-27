import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            // Transform errors into a key-value format
            const errorDetails: Record<string, string> = {};
            error.details.forEach((detail: any) => {
                const field = detail.context.label;
                const message = detail.message
                    .replace(/"/g, '')
                    .replace(/_/g, ' ')
                    .replace(/^\w/, (char: string) => char.toUpperCase());
                errorDetails[field] = message;
            });

            // Send the structured response
            return res.status(400).json({
                success: false,
                statusCode: 400,
                errorCode: 'ERR_REQUEST_VALIDATION_FAILED',
                errors: errorDetails,
            });
        }

        next();
    };
};
