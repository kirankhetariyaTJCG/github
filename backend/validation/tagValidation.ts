import Joi from 'joi';
import commonValidation from "@Validation/commonValidation"

const addEditSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    tag_name: Joi.string().required(),
    icon_image: Joi.string().required(),
    id: Joi.string().optional()
});

const updateTagSchema = Joi.object({
    id: Joi.string().required(),
    isDeleted: Joi.boolean().optional(),
    is_active: Joi.boolean().optional()
});

export const tagValidation = {
    addEditSchema,
    updateTagSchema
}