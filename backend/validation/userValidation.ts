import Joi from 'joi';
import commonValidation from "@Validation/commonValidation"

const updateWebsiteSchema = Joi.object({
    id: Joi.string().required(),
    website: Joi.string().required(),
});

const userIdSchema = Joi.object({
    user_id: Joi.string().required(),
});

const emailSchema = Joi.object({
    email: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().required(),
    type: Joi.string().required(),
});

const changeEmailSchema = Joi.object({
    token: Joi.string().required(),
    new_email: Joi.string().required(),
});

const removeFileSchema = Joi.object({
    user_id: commonValidation.emptyStringSchema,
    file_path: Joi.string().required(),
});

const registerUserSchema = Joi.object({
    restaurant_name: Joi.string().min(2).max(100).required(),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: commonValidation.strongPasswordSchema,
    role: commonValidation.emptyStringSchema,
    user_type: Joi.number().integer().optional(),
});

const updateProfileSchema = Joi.object({
    user_id: Joi.string().required(),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    profile_image: Joi.string().optional(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required(),
});

const createPasswordSchema = Joi.object({
    email: Joi.string().required(),
    password: commonValidation.strongPasswordSchema,
    confirm_password: Joi.string().required(),
});

export const userValidation = {
    userIdSchema,
    updateWebsiteSchema,
    changeEmailSchema,
    removeFileSchema,
    registerUserSchema,
    userLoginSchema,
    verifyEmailSchema,
    emailSchema,
    resetPasswordSchema,
    createPasswordSchema,
    updateProfileSchema,
    forgotPasswordSchema,
}