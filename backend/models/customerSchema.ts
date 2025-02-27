import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICustomer extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    profile_image: string;
    tracker: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    is_deleted: boolean;
    password: string;
    source?: string | null;
    campaign_id?: string | null;
    reset_password_expire?: Date | null;
    is_send_invitations: boolean; // send invitations in mail or SMS
    unsubscribed: boolean;
    mac_address?: string | null;
    ip_address?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    city?: string | null;
    country?: string | null;
    street_address?: string | null;
    zip_code?: string | null;
    state?: string | null;
    country_code?: string | null;
    stripe_customer_id?: string | null;
    addresses?: any;
    cards?: any;
    billing_details?: any;
    terms?: boolean
}

const CustomerSchema = new Schema<ICustomer>({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
    },
    tracker: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    password: {
        type: String,
        select: false
    },
    terms: {
        type: Boolean,
        select: false
    },
    source: {
        type: String,
        default: null
    },
    campaign_id: {
        type: String,
        default: null
    },
    is_send_invitations: {
        type: Boolean,
        default: null
    },
    unsubscribed: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    mac_address: {
        type: String,
        default: null
    },
    ip_address: {
        type: String,
        default: null
    },
    longitude: {
        type: Number,
        default: null
    },
    latitude: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    street_address: {
        type: String,
        default: null
    },
    zip_code: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    country_code: {
        type: String,
        default: null
    },
    stripe_customer_id: {
        type: String,
        default: null
    },
    billing_details: {
        type: Schema.Types.Mixed,
        default: null
    },
    cards: [{
        type: Schema.Types.Mixed,
        default: null
    }],
    addresses: [{
        type: Schema.Types.Mixed,
        default: null
    }],
},
    { timestamps: true }
);

CustomerSchema.index({ email: 1 });
CustomerSchema.index({ is_deleted: 1 });
CustomerSchema.index({ first_name: 1, last_name: 1 });
CustomerSchema.index({ tracker: 1 });

const Customer: Model<ICustomer> = mongoose.model<ICustomer>("customer", CustomerSchema);
export default Customer;
