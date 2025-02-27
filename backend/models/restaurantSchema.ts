import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRestaurant extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    menu_id: mongoose.Schema.Types.ObjectId;
    name: string;
    phone?: string;
    additional_phones?: string[];
    country: string;
    state: string;
    city: string;
    postal_code?: string;
    address: string;
    latitude?: number;
    longitude?: number;
    website?: string;
    is_website_verified?: boolean;
    enable_sales_optimization?: boolean;
    is_code_genrated?: boolean;
    account_type: "Partner" | "RestaurantOwner";
    sales_tax_type?: number; // Defines the tax calculation method: 1 for GROSS (tax included in prices), 2 for NET (tax added on top)
    sales_tax_label?: string;
    sales_tax_delivery?: number; // sales tax applied to delivery charges.
    sales_tax_tip?: number; // This specifies a 20% tax on tips.
    sales_tax_convenience?: number; // tax rate for convenience charges.

    has_pickup?: boolean;
    pickup_type?: string;
    delivery_type?: string;
    has_delivery?: boolean;
    has_on_premise?: boolean;

    has_table_reservation?: boolean;
    reservation_table_min_guests?: number;
    reservation_table_max_guests?: number;
    reservation_table_min_time: number;
    reservation_table_max_time: number;
    reservation_table_hold_time_if_late: number;
    allows_guest_pre_order?: boolean;

    has_schedule_order?: boolean;
    pickup_order_advance_min_time?: number;
    pickup_order_advance_max_time?: number;
    delivery_order_advance_min_time?: number;
    delivery_order_advance_max_time?: number;
    delivery_time_slot?: number;
    allows_immediate_order?: boolean;

    pickup_payment_methods?: string[];
    delivery_payment_methods?: string[];
    dine_in_payment_methods?: string[];

    extended_address?: string[];
    extended_address_mandatory?: string[];
    is_delivery_outside_disabled?: boolean;

    owner_id?: mongoose.Schema.Types.ObjectId;
    reseller_id?: mongoose.Schema.Types.ObjectId;
    company?: {
        company_name?: string;
        address?: string;
        country_code?: number;
        phone?: string;
        agree?: string;
        company?: string;
        tax?: string;
        officer?: string;
        custom_terms?: string;
        custom_privacy?: string;
    };
    completed_screens_admin?: string[];
    stripe_key: string; // backend
    stripe_frontend_key: string; // frontend
    stripe_accountId: string;
    stripe_version: string;

    limit_orders_enabled: boolean;
    order_later_limit_delivery: number;
    order_later_limit_pickup: number;

    has_fulfillment_options: boolean;
    fulfillment_options: {
        enabled: boolean,
        order_type: string,
        label: string,
        message: string
    }[];

    recaptcha_enabled: boolean;
    allow_billing_details: boolean;
}

const restaurantSchema = new Schema<IRestaurant>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    reseller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    additional_phones: {
        type: [String],
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    address: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    website: {
        type: String,
    },
    is_website_verified: {
        type: Boolean,
        default: false,
    },
    enable_sales_optimization: {
        type: Boolean,
        default: false,
    },
    is_code_genrated: {
        type: Boolean,
        default: false,
    },
    account_type: {
        type: String,
        // enum: ["Partner", "RestaurantOwner"],
        default: "RestaurantOwner",
    },
    sales_tax_type: {
        type: Number,
    },
    sales_tax_label: {
        type: String,
    },
    sales_tax_delivery: {
        type: Number,
    },
    has_pickup: {
        type: Boolean,
        default: false,
    },
    has_delivery: {
        type: Boolean,
        default: false,
    },
    pickup_type: {
        type: String,
        default: null,
    },
    delivery_type: {
        type: String,
        default: null,
    },
    is_delivery_outside_disabled: {
        type: Boolean,
        default: false,
    },
    extended_address: {
        type: [String],
        default: [],
    },
    extended_address_mandatory: {
        type: [String],
        default: [],
    },
    has_on_premise: {
        type: Boolean,
        default: false,
    },
    has_table_reservation: {
        type: Boolean,
        default: false,
    },
    allows_guest_pre_order: {
        type: Boolean,
        default: false,
    },
    reservation_table_max_time: {
        type: Number,
    },
    reservation_table_min_time: {
        type: Number,
    },
    reservation_table_hold_time_if_late: {
        type: Number,
    },
    reservation_table_max_guests: {
        type: Number,
    },
    reservation_table_min_guests: {
        type: Number,
    },
    has_schedule_order: {
        type: Boolean,
        default: false,
    },
    pickup_order_advance_min_time: {
        type: Number,
    },
    pickup_order_advance_max_time: {
        type: Number,
    },
    delivery_order_advance_min_time: {
        type: Number,
    },
    delivery_order_advance_max_time: {
        type: Number,
    },
    delivery_time_slot: {
        type: Number,
    },
    allows_immediate_order: {
        type: Boolean,
        default: false,
    },
    pickup_payment_methods: {
        type: [String],
        default: [],
    },
    delivery_payment_methods: {
        type: [String],
        default: [],
    },
    dine_in_payment_methods: {
        type: [String],
        default: [],
    },
    completed_screens_admin: {
        type: [String],
        default: [],
    },
    company: {
        company_name: { type: String },
        address: { type: String },
        country_code: { type: Number },
        phone: { type: String },
        agree: { type: String },
        company: { type: String },
        tax: { type: String },
        officer: { type: String },
        custom_terms: { type: String },
        custom_privacy: { type: String },
    },
    stripe_key: {
        type: String,
        select: false
    },
    stripe_frontend_key: {
        type: String,
        select: false
    },
    stripe_accountId: {
        type: String,
        select: false
    },
    stripe_version: {
        type: String,
        select: false
    },
    limit_orders_enabled: {
        type: Boolean,
        default: false
    },
    order_later_limit_delivery: {
        type: Number,
        default: 1
    },
    order_later_limit_pickup: {
        type: Number,
        default: 1
    },
    has_fulfillment_options: {
        type: Boolean,
        default: false
    },
    fulfillment_options: [
        {
            enabled: {
                type: Boolean,
                default: null
            },
            order_type: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            message: {
                type: String,
                default: null
            }
        }
    ],
    recaptcha_enabled: {
        type: Boolean,
        default: false
    },
    allow_billing_details: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


restaurantSchema.index({ menu_id: 1 });
restaurantSchema.index({ stripe_key: 1 });
restaurantSchema.index({ stripe_accountId: 1 });

// Create and export the Restaurant model
const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>("restaurant", restaurantSchema);
export default Restaurant;
