import Joi from 'joi';
import commonValidation from "@Validation/commonValidation"

const findByIdSchema = Joi.object({
    id: Joi.string().required(),
});

const restaurantIdSchema = Joi.object({
    restaurant_id: Joi.string().required(),
});

const menuIdSchema = Joi.object({
    menu_id: Joi.string().required(),
});

const restaurantSchedulesSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    services: Joi.number().integer().required(),
});

const verifyDomainSchema = Joi.object({
    id: Joi.string().required(),
    domain: Joi.string().required(),
});

const updateRestaurantSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    website: Joi.string().optional(),
    phone: Joi.string().optional(),
    additional_phones: Joi.array().items(Joi.string()).optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    address: Joi.string().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    is_website_verified: Joi.boolean().optional(),
    account_type: Joi.string().valid("Partner", "RestaurantOwner").optional(),
    sales_tax_type: Joi.number().optional(),
    sales_tax_label: Joi.string().optional(),
    sales_tax_delivery: Joi.number().optional(),
    has_pickup: Joi.boolean().optional(),
    has_delivery: Joi.boolean().optional(),
    is_delivery_outside_disabled: Joi.boolean().optional(),
    has_on_premise: Joi.boolean().optional(),
    has_table_reservation: Joi.boolean().optional(),
    allows_guest_pre_order: Joi.boolean().optional(),
    reservation_table_max_time: Joi.number().min(0).optional(),
    reservation_table_min_time: Joi.number().min(0).optional(),
    reservation_table_hold_time_if_late: Joi.number().min(0).optional(),
    reservation_table_max_guests: Joi.number().min(1).optional(),
    reservation_table_min_guests: Joi.number().min(1).optional(),
    has_schedule_order: Joi.boolean().optional(),
    pickup_order_advance_min_time: Joi.number().min(0).optional(),
    pickup_order_advance_max_time: Joi.number().min(0).optional(),
    delivery_order_advance_min_time: Joi.number().min(0).optional(),
    delivery_order_advance_max_time: Joi.number().min(0).optional(),
    delivery_time_slot: Joi.number().min(0).optional(),
    allows_immediate_order: Joi.boolean().optional(),
    pickup_payment_methods: Joi.array().items(Joi.string()).optional(),
    delivery_payment_methods: Joi.array().items(Joi.string()).optional(),
    dine_in_payment_methods: Joi.array().items(Joi.string()).optional(),
});

const serviceScheduleSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    services: Joi.number().integer().required(),
    hours: Joi.array().items(Joi.object()).required(),
    details: Joi.object({
        message: Joi.string().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        affected_services: Joi.array().items(Joi.string()).optional(),
        pause_type: Joi.number().optional(),
        specific_services: Joi.array().items(Joi.number()).optional(),
    }).optional(),
});

const addTaxRateSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    name: Joi.string().required(),
    tax_rate: Joi.object({
        rate_pickup: Joi.number().integer().required(),
        rate_delivery: Joi.number().integer().required(),
        rate_preserve: Joi.number().integer().required(),
    }).required(),
});

const editTaxRateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    tax_rate: Joi.object({
        rate_pickup: Joi.number().required(),
        rate_delivery: Joi.number().required(),
        rate_preserve: Joi.number().required(),
    }).required(),
});


const addDeliveryZoneSchema = Joi.object({
    color: Joi.string().required(),
    delivery_fee: Joi.number().required(),
    minimum_order: Joi.number().required(),
    name: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    shape_json: Joi.string().required(),
    zone_type: Joi.number().required(),
    usage: Joi.number().required(),
    is_active: Joi.boolean().optional(),
});

const editDeliveryZoneSchema = Joi.object({
    id: Joi.string().required(),
    color: Joi.string().required(),
    delivery_fee: Joi.number().required(),
    minimum_order: Joi.number().required(),
    name: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    shape_json: Joi.string().required(),
    zone_type: Joi.number().required(),
    usage: Joi.number().required(),
    is_active: Joi.boolean().optional(),
});


const countryStateSchema = Joi.object({
    country_id: commonValidation.emptyStringSchema,
    state_id: commonValidation.emptyStringSchema,
});

const updateStatusSchema = Joi.object({
    id: Joi.string().required(),
    isDeleted: Joi.boolean().optional(),
    is_active: Joi.boolean().optional()
});


export const restaurantValidation = {
    findByIdSchema,
    updateRestaurantSchema,
    verifyDomainSchema,
    serviceScheduleSchema,
    restaurantIdSchema,
    restaurantSchedulesSchema,
    addTaxRateSchema,
    editTaxRateSchema,
    addDeliveryZoneSchema,
    editDeliveryZoneSchema,
    countryStateSchema,
    updateStatusSchema,
    menuIdSchema
}