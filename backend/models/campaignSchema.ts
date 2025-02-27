import mongoose, { Schema, Document, Types } from 'mongoose';

interface ICampaign extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    promotion_id: mongoose.Schema.Types.ObjectId;
    customer: string[];
    saved_customers: mongoose.Schema.Types.ObjectId[];
    invite_type: number; // email, SMS
    name: string;
    subject: string;
    body: string;
    cor_channel: string; // "email" or "sms"
    sending_status: number; // 1.pending, 2.draft, 3.sent
    active: boolean;
    scheduled: number;
    schedule_at: number;
}

const campaignSchema: Schema<ICampaign> = new Schema({
    restaurant_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    customer: {
        type: [String],
        default: []
    },
    saved_customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        default: []
    }],
    invite_type: {
        type: Number,
        default: null
    },
    promotion_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    },
    cor_channel: {
        type: String,
        default: null
    },
    sending_status: {
        type: Number,
        default: 1
    },
    active: {
        type: Boolean,
        default: true
    },
    scheduled: {
        type: Number,
        default: null
    },
    schedule_at: {
        type: Number,
        default: null
    },
}, { timestamps: true });

const Campaign = mongoose.model<ICampaign>('campaign', campaignSchema);
export default Campaign;