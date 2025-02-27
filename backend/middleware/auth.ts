import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import User from "@Models/userSchema";
import { catchAsyncErrors } from "./catchAsyncErrors";
import { constants, MESSAGES, STATUS_CODES } from "@Utils/constant";
import Customer from "@Models/customerSchema";
import MobileHistory from "@Models/mobileHistorySchema";
interface AuthRequest extends Request {
  userData?: any;
  user?: any;
}

export const isAuthenticatedUser = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = "";

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }

  try {
    const decodedData: any = jwt.verify(token, constants.JWT_SECRET as string);
    let requestedUser = await User.findOne({ _id: decodedData.id, is_deleted: false, is_active: true });

    if (!requestedUser) {
      // return next(new ErrorHandler(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND));
      return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }
    req.user = decodedData;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }
}
);

export const isAuthenticatedCus = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = "";

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }

  try {
    const decodedData: any = jwt.verify(token, constants.JWT_CUS_SECRET as string);
    let requestedUser = await Customer.findOne({ _id: decodedData._id, is_deleted: false });

    if (!requestedUser) {
      // return next(new ErrorHandler(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND));
      return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }
    req.user = decodedData;

    next();
  } catch (error) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }
});

// Middleware to authorize roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new ErrorHandler(MESSAGES.ROLE_NOT_AUTHORIZED.replace("{role}", req.user?.role), STATUS_CODES.FORBIDDEN)
      );
    }
    next();
  };
};

export const isAuthorizeMobile = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = "";

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }

  try {
    const decodedData: any = jwt.verify(token, constants.JWT_SECRET as string);
    let requestedUser = await User.findOne({ _id: decodedData.id, is_deleted: false });

    if (!requestedUser) {
      return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }
    const loginHistory = await MobileHistory.findOne({ restaurant_id: decodedData.restaurant_id, token: token })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!loginHistory) {
      return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }
    req.user = decodedData;

    next();
  } catch (error) {
    return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
  }
});