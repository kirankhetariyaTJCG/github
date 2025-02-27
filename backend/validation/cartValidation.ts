import Joi from 'joi';
import commonValidation from "@Validation/commonValidation"

const managePromotionSchema = Joi.object({
    id: Joi.string().optional(),
    menu_id: Joi.string().required(),
    restaurant_id: Joi.string().optional(),
    items: Joi.array().items(Joi.string()).optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    coupon_code: Joi.string().optional(),
    custom_coupon: Joi.string().optional(),
    type: Joi.number().optional(),
    usage_maximum: Joi.number().optional(),
    outcomes: Joi.array().items(Joi.string()).optional(),
    day_of_week: Joi.array().items(
        Joi.object({
            day: Joi.string().optional(),
            start_time: Joi.number().optional(),
            end_time: Joi.number().optional(),
        })
    ).optional(),
    fulfill_conditions: Joi.object({
        minimum_order_value: Joi.number().optional(),
        client_type: Joi.number().optional(),
        once_in_cart: Joi.boolean().optional(),
        fulfillment_time: Joi.number().optional(),
        day_of_week: Joi.array().items(
            Joi.object({
                day: Joi.string().optional(),
                start_time: Joi.number().optional(),
                end_time: Joi.number().optional(),
            })
        ).optional(),
        order_time: Joi.number().optional(),
        order_start_time: Joi.number().optional(),
        order_end_time: Joi.number().optional(),
    }).optional(),
    showcase_conditions: Joi.object({
        client_type: Joi.number().optional(),
        display_start_time: Joi.number().optional(),
        display_end_time: Joi.number().optional(),
    }).optional(),
    mark_promo_as: Joi.number().optional(),
    amount: Joi.number().optional(),
    amount_type: Joi.number().optional(),
    limited_stock: Joi.number().optional(),
    expiry_date: Joi.number().optional(),
    system: Joi.boolean().optional(),
});

export const cartValidation = {
    managePromotionSchema
}