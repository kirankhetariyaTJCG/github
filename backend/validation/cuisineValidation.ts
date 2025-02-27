import Joi from 'joi';

const addCuisineSchema = Joi.object({
    restaurant_id: Joi.string().optional(),
    cuisine_name: Joi.string().optional(),
    is_popular: Joi.boolean().optional(),
    cuisine_image: Joi.string().optional(),
    cuisine_id: Joi.string().optional(),
    is_default: Joi.boolean().optional(),
});

const editCuisineSchema = Joi.object({
    id: Joi.string().required(),
    cuisine_name: Joi.string().required(),
    is_popular: Joi.boolean().required(),
    cuisine_image: Joi.string().optional(),
    is_default: Joi.boolean().optional(),
});

const manageDefaultCuisineSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    cuisine_name: Joi.string().required(),
    is_popular: Joi.boolean(),
    cuisine_image: Joi.string().optional(),
    id: Joi.string().optional(),
});


export const cuisineValidation = {
    addCuisineSchema,
    editCuisineSchema,
    manageDefaultCuisineSchema
}