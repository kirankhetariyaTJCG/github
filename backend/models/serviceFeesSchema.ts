import mongoose, { Document, Schema } from 'mongoose';

interface IServiceFeesSchema extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    fee_name: string;
    charge: string;
    charge_type: string;
    apply: number;
    apply_value: number;
    end_date: number;
    start_date: number;
    is_card_details: boolean;
    is_cash: boolean;
    is_delivery_person: boolean;
    is_pickup: boolean;
    is_premise: boolean;
    is_tax: boolean;
    is_active: boolean;
    is_deleted: boolean;
    week_days: string[];
}

const ServiceFees: Schema<IServiceFeesSchema> = new Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
    },
    fee_name: {
        type: String,
        default: null,
    },
    charge: {
        type: String,
        default: null,
    },
    charge_type: {
        type: String,
        default: null,
    },
    apply: {
        type: Number,
        default: null
    },
    apply_value: {
        type: Number,
        default: null
    },
    start_date: {
        type: Number,
        default: null,
    },
    end_date: {
        type: Number,
        default: null,
    },
    is_card_details: {
        type: Boolean,
        default: false
    },
    is_cash: {
        type: Boolean,
        default: false
    },
    is_delivery_person: {
        type: Boolean,
        default: false
    },
    is_pickup: {
        type: Boolean,
        default: false
    },
    is_premise: {
        type: Boolean,
        default: false
    },
    is_tax: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    week_days: {
        type: [String],
        default: []
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const website = mongoose.model<IServiceFeesSchema>('service_fees', ServiceFees);
export default website;
