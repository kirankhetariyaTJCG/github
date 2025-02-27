import mongoose, { Schema, Document } from "mongoose";

export interface IPaymentWebhookLogs extends Document {
    id: string;
    token: any;
    event: string;
    response: any;
}

const PaymentWebhookLogs: Schema = new Schema({
    id: {
        type: String
    },
    token: {
        type: Schema.Types.Mixed
    },
    event: {
        type: String
    },
    response: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true });

export default mongoose.model<IPaymentWebhookLogs>("payment_webhook_logs", PaymentWebhookLogs);
