import mongoose, { Schema, Document } from "mongoose";

export interface IPromotion extends Document {
    menu_id: mongoose.Types.ObjectId;
    restaurant_id: mongoose.Types.ObjectId;
    users_used: mongoose.Types.ObjectId[];
    other_items: {
        items: mongoose.Types.ObjectId;
        sizes: mongoose.Types.ObjectId[];
    }[];
    required_items: {
        item_id: mongoose.Types.ObjectId;
        quantity_required: number;
    }[]; // For Items, (Buy one, get one free), FREE Item
    items: {
        items: mongoose.Types.ObjectId;
        sizes: mongoose.Types.ObjectId[];
    }[];
    free_items: {
        item_id: mongoose.Types.ObjectId;
        quantity_free: number;
    }[]; // For (Buy one, get one free), FREE Item
    name: string;
    description: string;
    coupon_code: string;
    custom_coupon: string;
    type: number; // 1. CART, 2.items, 3.Free delivery, 4.Buy one, get one free, 5.Fixed discount amount on cart, 6.Payment method reward, 7.Get a FREE item
    usage_maximum: number;
    usage_counter: number;
    outcomes: string[];
    minimum_order_value: number;
    client_type: number; // 1 for any client, 2 for new client, 3 for returning client
    order_type: number; // 1 for any type, 2 for custom selection
    custom_selection: string[],
    is_selected_delivery_zone: boolean,
    selected_delivery_zones: mongoose.Types.ObjectId[],
    once_in_cart: boolean;
    mark_promo_as: number; // 1 for not exclusive, 2 for exclusive, 3 for master promo deal
    display_time: number; // 1 Always show, 2 limited show, 3 hide from menu
    fulfillment_days: string, // For FulFillment Days
    display_time_days: string, // For Display Time Days
    order_time: number,
    fulfillment_time: number, // 1 Any Time, 2 Custom Selection
    cart_value: number,
    amount: number;
    amount_type: number; // 1 for percentage discount, 2 for fixed amount discount
    max_discount: number;
    expensive_item_discount: number;
    cheapest_item_discount: number;
    items_discount: number;
    other_items_discount: number;
    charges: number; // 1 no extra charge, 2 for choice/addons, 3 for choice/addons & sizes
    discount_type: number; // 1 manually descount, 2 automatic discount
    limited_stock: number;
    expiry_date: number;
    is_expiry: boolean;
    is_deleted: boolean;
    is_active: boolean;
    system: boolean; // true: (pre made promotion)
    highlight: number; // 1 No Highlight , 2 Custom Selection
    eligible_payment_methods: number[];
    once_per_client: boolean;
    delivery_charges_waived: boolean;
    symphony_auto_added: {
        type: Boolean,
        default: false, // it's manually created unless marked otherwise
    },
    benefits: string[];
    promotion_image: string;
    start_date: number;
    end_date: number;
}

const promotionSchema: Schema = new Schema(
    {
        menu_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "menu",
            default: null,
        },
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurant",
            default: null,
        },
        users_used: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "customer",
                default: [],
            },
        ],
        items: [{
            items: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "item",
                default: null,
            },
            sizes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "size",
                default: [],
            }],
        }],
        other_items: [{
            items: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "item",
                default: null,
            },
            sizes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "size",
                default: [],
            }],
        }],
        required_items: [
            {
                item_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "item",
                    default: null,
                },
                quantity_required: {
                    type: Number,
                    default: null,
                },
            },
        ],
        free_items: [
            {
                item_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "item",
                    default: null,
                },
                quantity_free: {
                    type: Number,
                    default: null,
                },
            },
        ],
        name: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        coupon_code: {
            type: String,
            default: null
        },
        custom_coupon: {
            type: String,
            default: null
        },
        type: {
            type: Number,
            default: null
        },
        usage_maximum: {
            type: Number,
            default: null
        },
        usage_counter: {
            type: Number,
            default: null
        },
        outcomes: {
            type: [String],
            default: null
        },
        minimum_order_value: {
            type: Number,
            default: null
        },
        client_type: {
            type: Number,
            default: null
        },
        order_type: {
            type: Number,
            default: null
        },
        custom_selection: {
            type: [String],
            default: null
        },
        is_selected_delivery_zone: {
            type: Boolean,
            default: null
        },
        selected_delivery_zones: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "delivery_zone",
                default: null,
            }
        },
        once_in_cart: {
            type: Boolean,
            default: null
        },
        mark_promo_as: {
            type: Number,
            default: null
        },
        display_time: {
            type: Number,
            default: null
        },
        fulfillment_days: {
            type: String,
            default: null
        },
        display_time_days: {
            type: String,
            default: null
        },
        order_time: {
            type: Number,
            default: null
        },
        fulfillment_time: {
            type: Number,
            default: null
        },
        cart_value: {
            type: Number,
            default: null
        },
        amount: {
            type: Number,
            default: null
        },
        amount_type: {
            type: Number,
            default: null
        },
        discount_type: {
            type: Number,
            default: null
        },
        max_discount: {
            type: Number,
            default: null
        },
        expensive_item_discount: {
            type: Number,
            default: null
        },
        cheapest_item_discount: {
            type: Number,
            default: null
        },
        charges: {
            type: Number,
            default: null
        },
        items_discount: {
            type: Number,
            default: null
        },
        other_items_discount: {
            type: Number,
            default: null
        },
        limited_stock: {
            type: Number,
            default: null
        },
        expiry_date: {
            type: Number,
            default: null
        },
        is_expiry: {
            type: Boolean,
            default: false
        },
        is_deleted: {
            type: Boolean,
            default: false
        },
        is_active: {
            type: Boolean,
            default: false
        },
        system: {
            type: Boolean,
            default: false
        },
        highlight: {
            type: Number,
            default: null
        },
        eligible_payment_methods: {
            type: [Number],
            default: null
        },
        once_per_client: {
            type: Boolean,
            default: null
        },
        delivery_charges_waived: {
            type: Boolean,
            default: null
        },
        symphony_auto_added: {
            type: Boolean,
            default: false
        },
        benefits: {
            type: [String],
            default: []
        },
        promotion_image: {
            type: String,
            default: null
        },
        start_date: {
            type: Number,
            default: null
        },
        end_date: {
            type: Number,
            default: null
        },
    },
    { timestamps: true }
);

export default mongoose.model<IPromotion>("promotion", promotionSchema);
