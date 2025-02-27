import { NextFunction, Request, Response } from 'express'
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

import User from '@Models//userSchema';
import Restaurant from '@Models//restaurantSchema';
import Owner from '@Models/owner/ownerSchema';

import ErrorHandler from '@Utils/errorHandler';
import { createResponse, sendMail } from '@Utils/function';
import { constants } from '@Utils/constant';

// Add Restaurent by Reseler API
export const addRestaurent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, new_restaurant_name, reseller_Id } = req.body

    // 1. Validate Reseller
    const reseller = await User.findById({ _id: reseller_Id })
    if (!reseller) return next(new ErrorHandler('Reseller not found.', 404))

    // 2. Create a new restaurent user 
    const newUser = await User.create({ first_name, last_name, email })
    if (!newUser) return next(new ErrorHandler('Failed to create user.', 400));

    // 3. Create a new restaurant
    const restaurant = await Restaurant.create({ name: new_restaurant_name, reseller_Id, user_id: newUser?._id })
    if (!restaurant) return next(new ErrorHandler('Failed to create restaurant.', 400));

    // 4. Send Verification Email
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

    // 5. Send Reset Password Email
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
            reseller: reseller,
            user: newUser,
            restaurant: restaurant
        }
    }));
})


// Create Company by Reseller API
export const createCompany = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { brandName, existUserId, existRestaurentId, firstName, lastName, email, newRestaurentName, resellerUserId } = req.body

    //1. Check owner exist or not 
    const existOwner = await Owner.findOne({ ownerId: existUserId })
    if (existOwner) return next(new ErrorHandler("Owner already exist.", 400));

    //1. update User and add New User 
    const existUser = await User.findByIdAndUpdate(existUserId, { $set: { role: 'owner' } }, { new: true })
    if (!existUser) return next(new ErrorHandler("Failed to update user role.", 400));

    //2. Create second user and restaurent 
    const newUser = await User.create({ firstName, lastName, email })
    if (!newUser) return next(new ErrorHandler("Failed to create new User account.", 400));

    const restaurant = await Restaurant.create({
        name: newRestaurentName,
        userId: newUser?._id,
        ownerId: existUser?._id,
        resellerUserId: resellerUserId
    })
    if (!restaurant) return next(new ErrorHandler('Failed to create restaurent.', 400))

    //4. Create owner 
    const owner = await Owner.create({
        brandName: brandName,
        ownerId: existUser?._id,
        restaurentIds: [restaurant?._id, existRestaurentId],
        resellerUserId: resellerUserId
    })
    if (!owner) return next(new ErrorHandler('Failed to create owner.', 400))

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
        }
    }));
})
