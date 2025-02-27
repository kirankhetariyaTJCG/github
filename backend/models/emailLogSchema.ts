import mongoose, { Schema, Document } from "mongoose";

export interface IEmailLog extends Document {
    message_id: string;
    from_email: string;
    to_email: string;
    from_phone?: string;
    to_phone?: string;
    subject?: string;
    content: string;
    response: any;
    error?: any;
    status: boolean; // sent, failed,
    type: number; // 1.email, 2.sms
    module?: string;
}

const EmailLogSchema: Schema = new Schema({
    message_id: {
        type: String,
        default: null
    },
    from_email: {
        type: String,
        default: null
    },
    to_email: {
        type: String,
        default: null
    },
    from_phone: {
        type: String,
        default: null
    },
    to_phone: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    response: {
        type: Schema.Types.Mixed,
        default: null
    },
    error: {
        type: Schema.Types.Mixed,
        default: null
    },
    status: {
        type: Boolean,
        default: null
    },
    type: {
        type: Number,
        default: null
    },
    module: {
        type: String,
        default: null
    },
}, { timestamps: true });

const EmailLog = mongoose.model<IEmailLog>("email_log", EmailLogSchema);

export default EmailLog;
