import { Request, Response, NextFunction, response } from 'express';
import * as Sentry from '@sentry/node';
import { createLogs } from '@Utils/function';

export const catchAsyncErrors = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(theFunc(req, res, next)).catch((error) => {
            // Sentry.captureException(error);
            createLogs({
                message: 'Error occurred',
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                request: req.body,
                response: error,
                status: "error"
            })
            // console.error("Error occurred::::::", error);
            next(error);
        });
    };
};
