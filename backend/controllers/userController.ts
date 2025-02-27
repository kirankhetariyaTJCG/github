// Core and Third-Party Libraries
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import User from '@Models/userSchema';
import Restaurant from '@Models/restaurantSchema';

// Utils and Helpers
import { createUserToken, createResponse, sendMail, formatMessage, getRedisData, storeRedisData, restaurantSetup, handleLocationSearch } from '@Utils/function';
import { userRequest } from '@Utils/customInterface';

// Error Handling
import ErrorHandler from '@Utils/errorHandler';

// JWT Token Utility
import sendToken from '@Utils/jwtToken';

// File Upload
import { uploadFile } from '@Utils/multer';

// Constants
import { constants, MESSAGES, STATUS_CODES } from '@Utils/constant';
import Permissions from '@Models/permissionsSchema';


// Introduction API
export const intro = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        msg: `Welcome to the 1ROOS API Documentation. It's a restaurant's online ordering system.`
    });
});

// Register User
export const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_name, first_name, last_name, email, password, role, user_type } = req.body;

    const existingUser = await User.findOne({ email, is_deleted: false }).lean();
    if (existingUser) {
        return res.status(STATUS_CODES.CONFLICT).json(createResponse({
            statusCode: STATUS_CODES.CONFLICT,
            success: false,
            message: "Email is already registered. Please use a different email.",
            data: null
        }));
    }

    const defaultPermission = (await Permissions.find({ is_default: true }, { _id: 1 }).lean())
        .map(permission => permission._id.toString());

    const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        role,
        user_type,
        permissions: defaultPermission
    });
    // Generate email verification code
    const verificationCode = newUser.generateEmailVerificationCode();
    await newUser.save();

    // Create restaurant entry
    const newRestaurant = await Restaurant.create({
        user_id: newUser._id,
        name: restaurant_name,
        sales_tax_type: 1,
        pickup_payment_methods: "CASH",
        delivery_payment_methods: "CASH",
        extended_address_mandatory: ['city', 'street', 'zipcode'],
        extended_address: ['city', 'street', 'zipcode'],
    });
    await newRestaurant.save();
    if (newRestaurant) {
        await restaurantSetup(newRestaurant._id, newUser._id);
    }

    // Send verification email
    // const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/verify-email?code=${verificationCode}&email=${encodeURIComponent(email)}`;
    const verificationUrl = `${constants.FRONTEND_URL}/verify-email/?token=${verificationCode}&email=${encodeURIComponent(email)}`;
    const message = `Please verify your email by clicking the following link: \n\n${verificationUrl}\n\nNote: This verification code expires in 1 hour.`;
    const emailSent = await sendMail(newUser.email, message, 'Email Verification');

    if (!emailSent) {
        // If email sending failed, reset the token and expiry fields
        newUser.email_verification_code = null;
        newUser.email_verification_expire = null;
        await newUser.save({ validateBeforeSave: false });
        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }

    // Send success response with JWT token
    sendToken(newUser, 201, res, "Registration successful. Verification email sent.", newRestaurant);
});

// Login User
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, is_deleted: false }).select("+password");
    if (!user) {
        return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.BAD_REQUEST));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.BAD_REQUEST));
    }

    await User.findByIdAndUpdate(user._id, { is_active: true }, { runValidators: true });

    // Fetch associated restaurant details
    const restaurant = await Restaurant.findOne({ user_id: user._id }).lean().exec();
    sendToken(user, STATUS_CODES.SUCCESS, res, MESSAGES.LOGIN_SUCCESS, restaurant);
});

// Logout User
export const logout = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    await User.findByIdAndUpdate(req?.user?.id, { is_active: false }, { runValidators: true });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.LOGOUT_SUCCESS,
    }));
});

// Forget Password
export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, type } = req.body;

    const user = await User.findOne({ email, is_deleted: false });
    if (!user) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    // Generate reset password token
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/${type}/${resetToken}`;
    const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you did not request this, please ignore this email.`;
    const emailSent = await sendMail(user.email, message, 'Password Recovery');

    if (!emailSent) {
        // If email sending failed, reset the token and expiry fields
        user.reset_password_token = null;
        user.reset_password_expire = null;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(MESSAGES.EMAIL_SEND_FAILURE, STATUS_CODES.INTERNAL_SERVER_ERROR));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.EMAIL_SENT_SUCCESS,
    }));
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { token, password, confirm_password } = req.body

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        reset_password_token: resetPasswordToken,
        reset_password_expire: { $gt: Date.now() },
    }).select("+reset_password_token");

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
    }

    if (password !== confirm_password) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = password;
    user.reset_password_token = null;
    user.reset_password_expire = null;
    await user.save();

    res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Password reset successfully",
        data: user
    }));
});

export const changePassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { token, current_password, new_password, confirm_password } = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        reset_password_token: resetPasswordToken,
        reset_password_expire: { $gt: Date.now() },
    }).select("+reset_password_token password");

    if (!user) {
        return next(new ErrorHandler("Change password token is invalid or has expired", 400));
    }

    const isPasswordMatched = await user.comparePassword(current_password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Current password is incorrect", 400));
    }

    if (new_password !== confirm_password) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    if (new_password === current_password) {
        return next(new ErrorHandler("New password cannot be the same as the current password", 400));
    }

    user.password = new_password;
    await user.save();

    res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Password changed successfully",
        data: null,
    }));
});

// Refresh Token
export const refreshToken = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }

    try {
        const decoded: any = jwt.verify(refresh_token, constants.JWT_REFRESH_SECRET as string);
        const user = await User.findOne({ _id: decoded.id, is_deleted: false });

        if (!user) {
            return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
        }

        const restaurant: any = await Restaurant.findOne({
            user_id: user._id
        }).select('_id')

        const newAccessToken = createUserToken({
            id: user._id,
            email: user?.email || "",
            user_type: user?.user_type,
            first_name: user?.first_name,
            last_name: user?.last_name,
            role: user?.role,
            restaurant_id: restaurant._id
        });

        res.status(STATUS_CODES.SUCCESS).json({ accessToken: newAccessToken });
    } catch (error) {
        // console.error('Error refreshing token:', error);
        return next(new ErrorHandler(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED));
    }
});

// Request Email Change
export const requestEmailChange = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;

    const user = await User.findById({ _id: user_id });
    if (!user) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    const emailChangeToken = user.generateEmailChangeToken();
    await user.save({ validateBeforeSave: false });

    const emailChangeUrl = `${req.protocol}://${req.get('host')}/reset-email/${emailChangeToken}`;
    const message = `To change your email, click the following link: \n\n${emailChangeUrl}\n\nNote: This link expires in 1 hour.`;
    const emailSent = await sendMail(user.email, message, 'Email Change Request');

    if (!emailSent) {
        user.email_change_token = null;
        user.email_change_expire = null;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(MESSAGES.EMAIL_SEND_FAILURE, STATUS_CODES.INTERNAL_SERVER_ERROR));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.EMAIL_SENT_SUCCESS,
    }));
});


// Change Email
export const changeEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { new_email, token } = req.body;

    const emailChangeToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        email_change_token: emailChangeToken,
        email_change_expire: { $gt: Date.now() },
    }).select("+email_change_token");

    if (!user) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    const emailExists = await User.findOne({ email: new_email, is_deleted: false });
    if (emailExists) {
        return next(new ErrorHandler('Email already in use', 400));
    }

    const verificationCode = user.generateEmailVerificationCode();
    user.is_email_verified = false
    await user.save({ validateBeforeSave: false });

    user.changeEmail(new_email);

    // Send email verification link
    // const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/verify-email?code=${verificationCode}&email=${encodeURIComponent(new_email)}`;
    const verificationUrl = `${constants.FRONTEND_URL}/verify-email/?token=${verificationCode}&email=${encodeURIComponent(new_email)}`;
    const message = `Please verify your email by clicking on the following link: \n\n${verificationUrl}\n\nNote: This verification code will expire in 1 hour.`;

    const emailSent = await sendMail(new_email, message, 'Verify your new email address');

    if (!emailSent && user) {
        // If email sending failed, reset the token and expiry fields
        user.email_verification_code = null;
        user.email_verification_expire = null;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(MESSAGES.EMAIL_SEND_FAILURE, STATUS_CODES.INTERNAL_SERVER_ERROR));
    }

    res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: `Email updated successfully. Please verify your new email address`,
    }));
});

// Send Verification Email
export const sendVerificationEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email, is_deleted: false });

    if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            errorCode: null,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    if (user?.is_email_verified) {
        return res.status(400).json(createResponse({
            statusCode: 400,
            success: false,
            errorCode: null,
            message: "Email is already verified",
        }));
    }

    // Generate Email Verification Code
    const verificationCode = user.generateEmailVerificationCode();

    await user.save({ validateBeforeSave: false });

    // Send the verification email
    // const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/verify-email?code=${verificationCode}&email=${encodeURIComponent(email)}`;

    const verificationUrl = `${constants.FRONTEND_URL}/verify-email/?token=${verificationCode}&email=${encodeURIComponent(email)}`;

    const message = `Please verify your email by clicking on the following link: \n\n${verificationUrl}\n\nNote: This verification code will expire in 1 hour.`;

    const emailSent = await sendMail(user.email, message, 'Email Verification');

    if (!emailSent) {
        // If email sending failed, reset the token and expiry fields
        user.email_verification_code = null;
        user.email_verification_expire = null;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(MESSAGES.EMAIL_SEND_FAILURE, STATUS_CODES.INTERNAL_SERVER_ERROR));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.EMAIL_SENT_SUCCESS,
    }));
});

// Verify Email
export const verifyEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { token, email } = req.body;

    const emailFromUrl = decodeURIComponent(email as string);

    const userData = await User.findOne({
        is_deleted: false,
        email: emailFromUrl
    });

    if (userData?.is_email_verified) {
        return res.status(400).json(createResponse({
            statusCode: 400,
            success: false,
            errorCode: null,
            message: "Email is already verified",
        }));
    }

    // Hash the provided verification code to compare with the stored hashed code
    const hashedCode = crypto.createHash("sha256").update(token as string).digest("hex");

    const user = await User.findOne({
        is_deleted: false,
        email: emailFromUrl,
        email_verification_code: hashedCode,
        email_verification_expire: { $gt: new Date() }, // Check if the code is not expired
    });

    if (!user) {
        return res.status(400).json(createResponse({
            statusCode: 400,
            success: false,
            errorCode: null,
            message: "Invalid or expired verification code",
        }));
    }

    // Mark the email as verified and clear the verification code and expiration
    user.is_email_verified = true; // Adjust field name if necessary
    user.email_verification_code = null;
    user.email_verification_expire = null;
    await user.save();

    res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Email verified successfully",
    }));
});

// Update User Profile with File Upload
export const updateUserProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, user_id } = req.body;

    // Find the user by ID
    const user = await User.findById({ _id: user_id });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Update user fields
    if (first_name) user.first_name = first_name; // Adjust field name if necessary
    if (last_name) user.last_name = last_name; // Adjust field name if necessary

    // Handle profile image upload
    if (req?.file && req?.file?.path) {
        await uploadFile.deleteFile(user?.profile_image)
        user.profile_image = req.file.path;
    }

    // Save the updated user profile
    await user.save();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "User profile"),
        data: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
            email: user.email,
            role: user.role,
        },
    }));
});

export const createPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirm_password, email } = req.body;

    // 1. Validate password and confirmPassword match
    if (password !== confirm_password) return next(new ErrorHandler("Passwords do not match", 400));

    // 2. Find the user by id
    const user = await User.findOne({ email: email }).select('+password');

    // 3. Check if the user already has a password (indicating they have already set one)
    if (!user) return next(new ErrorHandler('User not found.', 404));

    if (user?.password) {
        return next(new ErrorHandler('Password already created, please use the forgot password option.', 400));
    }

    // 4. Set and save the new password
    user.password = password;
    await user.save();

    // 5. Send success response
    return res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: null,
        message: "Password created successfully, please log in.",
    }));
});


export const updateWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, website } = req.body

    const updatedWebsite = await User.findByIdAndUpdate(id, { website }, { new: true });

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "Website"),
        data: updatedWebsite?.website
    }));
});

export const getUserWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.body.user_id;

    const user = await User.findById(user_id).select('website');

    if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: user
    }));
});

export const uploadImage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const filePath = req?.file

    if (!filePath) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.FILE_UPLOAD_ERROR,
            data: null
        }));
    }

    return res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        errorCode: '',
        message: MESSAGES.FILE_UPLOAD_SUCCESS,
        data: {
            file_name: filePath?.filename,
            file_title: filePath?.originalname,
            file_path: filePath?.path,
            file_type: filePath?.mimetype
        },
    }));
});

export const uploadMultiImage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files?.length === 0) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null
        }));
    }

    const fileData = files.map(file => ({
        file_name: file.filename,
        file_title: file.originalname,
        file_path: file.path,
        file_type: file.mimetype
    }));

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: '',
        message: MESSAGES.FILE_UPLOAD_SUCCESS,
        data: fileData
    }));

});


export const removeFile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { file_path, user_id } = req.body;

    let data;

    if (user_id) {
        const userUpdated: any = await User.findByIdAndUpdate(user_id, { profile_image: null }, { new: true });
        data = {
            _id: userUpdated._id,
            first_name: userUpdated.first_name,
            last_name: userUpdated.last_name,
            profile_image: userUpdated.profile_image,
            email: userUpdated.email,
            role: userUpdated.role,
        }
    }

    await uploadFile.deleteFile(file_path)
    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: '',
        message: MESSAGES.FILE_DELETE_SUCCESS,
        data: data
    }));
});


export const deleteUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
        return next(new ErrorHandler(MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND));
    }

    user.is_deleted = true
    await user.save();

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "User"),
    }));
});

export const userList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const redisData = await getRedisData('userData');
    if (redisData) {
        return res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            errorCode: null,
            message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            data: redisData,
        }));
    }

    const userData = await User.find({ is_deleted: false });
    await storeRedisData('userData', userData, 3600);

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: userData,
    }));
});

export const getUserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body
    const userData = await User.findById(user_id);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: userData,
    }));
});

export const fetchDistances = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { locationName, userLocation, } = req.body

    const placeIdByLocationName = await handleLocationSearch(locationName, userLocation);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: placeIdByLocationName,
    }));
});