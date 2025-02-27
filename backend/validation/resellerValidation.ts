import Joi from "joi";

export const addRestaurantSchema = Joi.object({
    first_name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'First name is required.',
            'any.required': 'First name is required.'
        }),

    last_name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Last name is required.',
            'any.required': 'Last name is required.'
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Email is required.',
            'any.required': 'Email is required.'
        }),

    new_restaurant_name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Restaurant name is required.',
            'any.required': 'Restaurant name is required.'
        }),

    reseller_Id: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.length': 'Reseller user ID must be exactly 24 characters long.',
            'string.hex': 'Reseller user ID must be a valid hexadecimal string.',
            'any.required': 'Reseller user ID is required.'
        }),
});


export const createCompanySchema = Joi.object({
    brandName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Brand name is required.',
            'any.required': 'Brand name is required.'
        }),

    existUserId: Joi.string()
        .length(24)
        .hex() // Ensures the string is a valid hex string
        .required()
        .messages({
            'string.length': 'Existing user ID must be exactly 24 characters long.',
            'string.hex': 'Existing user ID must be a valid hexadecimal string.',
            'any.required': 'Existing user ID is required.'
        }),

    existRestaurentId: Joi.string()
        .length(24)
        .hex() // Ensures the string is a valid hex string
        .required()
        .messages({
            'string.length': 'Existing restaurant ID must be exactly 24 characters long.',
            'string.hex': 'Existing restaurant ID must be a valid hexadecimal string.',
            'any.required': 'Existing restaurant ID is required.'
        }),

    firstName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'First name is required.',
            'any.required': 'First name is required.'
        }),

    lastName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Last name is required.',
            'any.required': 'Last name is required.'
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Email is required.',
            'any.required': 'Email is required.'
        }),

    newRestaurentName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'New restaurant name is required.',
            'any.required': 'New restaurant name is required.'
        }),

    resellerUserId: Joi.string()
        .length(24)
        .hex() // Ensures the string is a valid hex string
        .required()
        .messages({
            'string.length': 'Reseller user ID must be exactly 24 characters long.',
            'string.hex': 'Reseller user ID must be a valid hexadecimal string.',
            'any.required': 'Reseller user ID is required.'
        }),
})