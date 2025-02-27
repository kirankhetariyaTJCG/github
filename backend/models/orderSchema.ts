import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    order_id: string;
    tracker: string;
    customer?: mongoose.Schema.Types.ObjectId | null;
    menu_id: mongoose.Schema.Types.ObjectId;
    restaurant_id: mongoose.Schema.Types.ObjectId;
    items: ICartItem[];
    sub_total: number;
    total_price: number; // grand_total
    order_status: number; // 0.init, 1.Pending, 2.Confirmed(accept), 3.Shipped(ready for delivery), 4.Delivered, 5.Cancelled, 6.missed,
    payment_status: number; // 0.Pending, 1.Paid, 2.Failed, 3.Refund
    payment_method: number; // 1.Credit Card, 2.Cash on Delivery,
    payment_method_string: string; // 1.Credit Card, 2.Cash on Delivery,
    payment_link: string;
    payment_details: any;
    token: string;
    currency: string;
    delivery_time: number;
    special_instructions: string | null;
    promo_code: string | null;
    discount: number;
    tax_rate: number;
    tax_amount: number;
    taxes: any;
    delivery_fee: number;
    order_date: number; // Date the order was placed
    delivery_address: IAddress[] | null; // for delivery orders
    is_pickup: boolean; // Whether the order is a pickup order
    is_delivery: boolean; // Whether the order is a delivery order
    pre_order_time: number;
    pre_order_date: number;
    cancellation_status: number | null; // 1.Pending, 2.Cancelled, 3.Not Cancelled
    cancellation_reason: string | null;
    payment_gateway_response: any;
    refund_status: number | null; // 1.Pending, 2.Refunded
    refund_response: any | null;
    discount_code: string | null;
    order_type: number; //  1.Pickup, 2.Delivery, 3.Table Reservation, 4.Pre-order
    estimated_delivery_time: number | null;
    actual_delivery_time: number | null;
    customer_feedback: string | null;
    billing_details: IBillingDetails | null;
    delivery_distance: number | null;
    delivery_duration: number | null;
    delivery_by_distance: boolean; // Whether delivery charges are calculated by distance
    retrieved: boolean; // Whether the order has been picked up by the delivery personnel
    retrieved_at: number | null; // order was picked up for delivery
    confirmed_at: number | null; // order was confirmed
    fulfill_time: number | null; // time when the order fulfillment was completed
    placed_at: string | null; // when the order was placed
    delivery_taxes: number | null; // Taxes applied specifically to delivery charges
    table_size: number; // Size of the table reserved
    available_time: number; // Available time for table reservation
    reservation_time: number; // Actual reservation time
    reservation_date: number; // Date of table reservation
    reservation_people: number;
    table_reservation_status: number; //  1.Confirmed, 2.Pending, 3.Cancelled
    client: any;
    available_date: number
    payment_intent_id: string;
    comments: string | null;
}

interface ICartItem {
    menu_item_id: mongoose.Schema.Types.ObjectId; // Reference to the menu item
    size_id: mongoose.Schema.Types.ObjectId | null; // Size selection
    choices_array: mongoose.Schema.Types.ObjectId[]; // Additional item choices
    quantity: number; // Quantity of the item
    price: number; // Price of a single item
    total_item_price: number; // Total price for the item (quantity * price)
    special_instructions: string | null;
}
// address for the delivery
interface IAddress {
    city: string
    street: string
    zipcode: string
    neighbourhood: string
    block: string
    intercom: string
    floor: string
    apartment: string
}

interface IBillingDetails {
    name: string; // Name of the person for billing
    phone: string;
    email: string | null;
    address: IAddress;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    lat: number;
    lng: number;
}

const OrderSchema = new Schema<IOrder>({
    tracker: {
        type: String,
        default: null
    },
    order_id: {
        type: String,
        default: null
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        default: null
    },
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        default: null
    },
    items: [{
        menu_item_id: { type: Schema.Types.ObjectId, ref: "item", default: null },
        size_id: { type: Schema.Types.ObjectId, ref: "size", default: null },
        choices_array: [{ type: Schema.Types.ObjectId, ref: "choice", default: null }],
        quantity: { type: Number, default: null },
        special_instructions: { type: String, default: null },
    }],
    promo_code: {
        type: String,
        default: null
    },
    sub_total: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: 0
    },
    tax_amount: {
        type: Number,
        default: 0
    },
    tax_rate: {
        type: Number,
        default: 0
    },
    delivery_fee: {
        type: Number,
    },
    delivery_taxes: {
        type: Number,
        default: null
    },
    total_price: {
        type: Number,
        default: null
    },
    order_status: {
        type: Number,
        default: 0,
    },
    payment_status: {
        type: Number,
        default: 0,
    },
    payment_method: {
        type: Number,
    },
    payment_method_string: {
        type: String,
        default: null
    },
    payment_details: {
        type: Schema.Types.Mixed,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    currency: {
        type: String,
        default: null
    },
    payment_link: {
        type: String,
        default: null
    },
    taxes: [{
        type: Schema.Types.Mixed,
        default: []
    }],
    client: {
        type: Schema.Types.Mixed,
        default: null
    },
    delivery_time: {
        type: Number,
    },
    special_instructions: {
        type: String,
        default: null
    },
    order_date: {
        type: Number,
    },
    delivery_address: [{
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        zipcode: {
            type: String,
        },
        neighbourhood: {
            type: String,
        },
        block: {
            type: String,
        },
        intercom: {
            type: String,
        },
        floor: {
            type: String,
        },
        apartment: {
            type: String,
        },
        lat: {
            type: Number,
            default: 0
        },
        lng: {
            type: Number,
            default: 0
        },
    }],
    is_pickup: {
        type: Boolean,
        default: false
    },
    is_delivery: {
        type: Boolean,
        default: true
    },
    pre_order_time: {
        type: Number,
        default: null
    },
    pre_order_date: {
        type: Number,
        default: null
    },
    cancellation_status: {
        type: Number,
        default: null,
    },
    cancellation_reason: {
        type: String,
        default: null
    },
    payment_gateway_response: {
        type: Schema.Types.Mixed,
        default: null
    },
    refund_status: {
        type: Number,
        default: null,
    },
    discount_code: {
        type: String,
        default: null
    },
    order_type: {
        type: Number,
        default: null
    },
    estimated_delivery_time: {
        type: Number,
        default: null
    },
    actual_delivery_time: {
        type: Number,
        default: null
    },
    customer_feedback: {
        type: String,
        default: null
    },
    billing_details: {
        type: Schema.Types.Mixed,
        default: null
    },
    delivery_distance: {
        type: Number,
        default: null
    },
    delivery_duration: {
        type: Number,
        default: null
    },
    delivery_by_distance: {
        type: Boolean,
        default: true
    },
    retrieved: {
        type: Boolean,
        default: false
    },
    retrieved_at: {
        type: Number,
        default: null
    },
    confirmed_at: {
        type: Number,
        default: null
    },
    fulfill_time: {
        type: Number,
        default: null
    },
    placed_at: {
        type: String,
        default: null
    },
    table_size: {
        type: Number,
        default: null
    },
    available_time: {
        type: Number,
        default: null
    },
    available_date: {
        type: Number,
        default: null
    },
    reservation_time: {
        type: Number,
        default: null
    },
    reservation_date: {
        type: Number,
        default: null
    },
    reservation_people: {
        type: Number,
        default: null
    },
    table_reservation_status: {
        type: Number,
        default: null
    },
    payment_intent_id: {
        type: String,
        default: null
    },
    refund_response: {
        type: Schema.Types.Mixed,
        select: false
    },
    comments: {
        type: String,
        default: null
    },
}, { timestamps: true });

OrderSchema.index({ customer: 1 });
OrderSchema.index({ menu_id: 1 });
OrderSchema.index({ tracker: 1 });

const Order = mongoose.model<IOrder>("order", OrderSchema);
export default Order;
