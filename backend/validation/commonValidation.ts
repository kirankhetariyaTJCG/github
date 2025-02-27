import Joi from 'joi';

const strongPasswordSchema = Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$'))
    .required()
    .messages({
        'string.pattern.base': 'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character.',
    });

const emptyStringDataSchema = Joi.string().allow('', null).empty('');

const emptyStringSchema = Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_ ]*$'))
    .allow('', null).empty('')
    .messages({
        'string.pattern.base': 'Only allow numbers and characters.',
    });

const notEmptyStringSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]*$')).allow('', null).empty('').messages({
    'string.pattern.base': 'Only allow numbers and characters.',
});

const mobileSchema = Joi.string().allow('', null).empty('').regex(/^\d{10}$/).messages({
    'string.pattern.base': 'Please enter valid moblie no.',
});

const stringValidationSchema = Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9_\\-.: ]*$')).messages({
    'string.pattern.base': 'Field only contain letters, numbers, and underscores.',
});

const commonStringValidationSchema = Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9_\\- ]*$')).messages({
    'string.pattern.base': 'Field only contain letters, numbers, and underscores.',
});

const socialMediaLinkSchema = Joi.object({
    platform: Joi.string().optional(),
    link: Joi.string().uri().optional()
});

export default {
    strongPasswordSchema,
    emptyStringSchema,
    mobileSchema,
    stringValidationSchema,
    commonStringValidationSchema,
    notEmptyStringSchema,
    emptyStringDataSchema,
    socialMediaLinkSchema
}; 