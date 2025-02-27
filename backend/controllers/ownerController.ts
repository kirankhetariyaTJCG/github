// Core and Third-Party Libraries
import { Request, Response, NextFunction } from "express";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import User from "@Models/userSchema";
import Restaurant from "@Models/restaurantSchema";
import Owner from "@Models/owner/ownerSchema";

// Utils and Helpers
import { createResponse, formatMessage, sendMail } from "@Utils/function";
import { constants, MESSAGES, STATUS_CODES } from "@Utils/constant";

// Error Handling
import ErrorHandler from "@Utils/errorHandler";

// Create Owner API
export const createCompany = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { brand_name, existing_user_id, existing_restaurant_id, new_restaurant_name, first_name, last_name, email } = req.body

    //1. Check owner exist or not 
    const existOwner = await Owner.findOne({ owner_id: existing_user_id })
    if (existOwner) return next(new ErrorHandler(formatMessage(MESSAGES.ALREADY_EXISTS, "Owner"), STATUS_CODES.CONFLICT));

    //1. update User and add New User 
    const existUser = await User.findByIdAndUpdate(existing_user_id, { $set: { role: 'owner' } }, { new: true })
    if (!existUser) return next(new ErrorHandler("Failed to update user role.", 400));

    const newUser = await User.create({ first_name, last_name, email });
    if (!newUser) return next(new ErrorHandler("Failed to create new User account.", 400));

    //2. Create second user restaurent 
    const restaurant = await Restaurant.create({ name: new_restaurant_name, user_id: newUser?._id, owner_id: existUser?._id })
    if (!restaurant) return next(new ErrorHandler('Failed to create restaurent.', 400))

    //3. Update owner restaurent 
    const updateRestaurent = await Restaurant.findByIdAndUpdate(
        existing_restaurant_id,
        { $set: { ownerId: existUser?._id } },
        { new: true }
    )
    if (!updateRestaurent) return next(new ErrorHandler('Failed to Update owner restaurent.', 400))

    //4. Create owner 
    const owner = await Owner.create({
        brand_name: brand_name,
        owner_id: existUser?._id,
        restaurants: [restaurant?._id, updateRestaurent?._id]
    })
    if (!owner) return next(new ErrorHandler('Failed to create owner.', 400))

    //5. Retrieve restaurant details for the response
    const restaurantDetails = await Restaurant.find({
        _id: { $in: [restaurant?._id, updateRestaurent?._id] }
    })

    //5. Send Verification Mail
    const verificationCode = newUser.generateEmailVerificationCode();
    await newUser.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/verify-email?code=${verificationCode}&email=${encodeURIComponent(newUser?.email)}&id=${encodeURIComponent(newUser?._id as any)}`;
    const message = `Please verify your email by clicking the following link: \n\n${verificationUrl}\n\nNote: This verification code expires in 1 hour.`;
    const emailSent = await sendMail(newUser.email, message, 'Email Verification');

    if (!emailSent) {
        newUser.email_verification_code = null;
        newUser.email_verification_expire = null;
        await newUser.save({ validateBeforeSave: false });
        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }

    //6. Send Reset Password Mail
    const resetPasswordUrl = `${constants.FRONTEND_URL}/auth/create-password?email=${encodeURIComponent(newUser?.email)}`;
    const message2 = `Please use the following link to set your password: \n\n ${resetPasswordUrl} \n\nNote: Setting your password is required. If you did not request this, you will not be able to access your account.`;
    const emailSent2 = await sendMail(newUser.email, message2, 'Password Recovery');

    if (!emailSent2) {
        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }

    return res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Create owner successfully.",
        data: {
            owner: owner,
            user: existUser,
            restaurantDetails: restaurantDetails,
        }
    }));
});

export const getCompanyDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { owner_id } = req.body

    const OwnerDetails = await Owner.findOne({ owner_id: owner_id })
    if (!OwnerDetails) return next(new ErrorHandler('Owner deos not exist.', 400));

    const restaurantDetails = await Restaurant.find({
        _id: { $in: OwnerDetails.restaurants }
    })

    const restaurantCount = restaurantDetails.length

    return res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Create owner successfully.",
        data: {
            owner: OwnerDetails,
            restaurantDetails: restaurantDetails,
            restaurantCount: restaurantCount,
        }
    }));
})

// Add Restaurant by Owner API
export const addRestaurant = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, new_restaurant_name, owner_id } = req.body

    // 1. Validate owner existence
    const owner = await Owner.findOne({ owner_id: owner_id })
    if (!owner) return next(new ErrorHandler('Owner not found.', 404))

    // 2. Create a new user
    const newUser = await User.create({ first_name, last_name, email })
    if (!newUser) return next(new ErrorHandler('Failed to create user.', 400));

    // 3. Create a new restaurant
    const restaurant = await Restaurant.create({ name: new_restaurant_name, owner_id: owner_id, user_id: newUser?._id })
    if (!restaurant) return next(new ErrorHandler('Failed to create restaurant.', 400));

    // 4. Update owner's restaurant list
    owner.restaurants.push(restaurant?._id as any);
    await owner.save();

    // 5. Send Verification Email
    const verificationCode = newUser.generateEmailVerificationCode();
    await newUser.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/verify-email?code=${verificationCode}&email=${encodeURIComponent(newUser?.email)}&id=${encodeURIComponent(newUser?._id as any)}`;
    const message = `Please verify your email by clicking the following link: \n\n${verificationUrl}\n\nNote: This verification code expires in 1 hour.`;
    const emailSent = await sendMail(newUser.email, message, 'Email Verification');

    if (!emailSent) {
        newUser.email_verification_code = null;
        newUser.email_verification_expire = null;
        await newUser.save({ validateBeforeSave: false });
        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }

    // 6. Send Reset Password Email
    const resetPasswordUrl = `${constants.FRONTEND_URL}/auth/create-password?email=${encodeURIComponent(newUser?.email)}`;
    const message2 = `Please use the following link to set your password: \n\n ${resetPasswordUrl} \n\nNote: Setting your password is required. If you did not request this, you will not be able to access your account.`;
    const emailSent2 = await sendMail(newUser.email, message2, 'Password Recovery');

    if (!emailSent2) return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));

    return res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Add Restaurent successfully.",
        data: {
            owner: owner,
            user: newUser,
            restaurant: restaurant
        }
    }));
})