import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
    tracker: string;
    user_id: mongoose.Schema.Types.ObjectId;
    menu_item_id: mongoose.Schema.Types.ObjectId;
    size_id: mongoose.Schema.Types.ObjectId | null;
    selected_choices: {
        choice_id: mongoose.Schema.Types.ObjectId,
        quantity: number
    }[];
    choices_array: string[];
    promo: mongoose.Schema.Types.ObjectId[];
    quantity: number;
    total_item_price: number;
    price: number;
    tax_rate: number;
    tax_value: number;
    discount: number; // Percentage
    total_discount_value: number; // Total Discounted Amount
    aggregated: number;
    promotion_id: mongoose.Schema.Types.ObjectId | null; // applied promotion
    special_instructions: string;
}

const cartSchema: Schema = new Schema({
    tracker: {
        type: String,
        default: null
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        default: null
    },
    menu_item_id: {
        type: Schema.Types.ObjectId,
        ref: "item",
        default: null
    },
    size_id: {
        type: Schema.Types.ObjectId,
        ref: "size",
        default: null
    },
    selected_choices: [{
        choice_id: {
            type: Schema.Types.ObjectId,
            ref: "choice",
            default: null
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    promotion_id: {
        type: Schema.Types.ObjectId,
        ref: "promotion",
        default: null
    },
    quantity: {
        type: Number,
        default: null
    },
    total_item_price: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    tax_rate: {
        type: Number,
        default: null
    },
    tax_value: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    total_discount_value: {
        type: Number,
        default: null
    },
    aggregated: {
        type: Number,
        default: null
    },
    special_instructions: {
        type: String,
        default: null
    },
    choices_array: {
        type: [String],
        default: null
    }
}, { timestamps: true });

cartSchema.index({ user_id: 1 });
cartSchema.index({ menu_item_id: 1 });
cartSchema.index({ tracker: 1 });

const Cart = mongoose.model<ICart>("cart", cartSchema);

export default Cart;
