import mongoose, { Schema, Document } from "mongoose";

export interface IMobileHistorySchema extends Document {
    token: string;
    name: string;
    os: string;
    os_version: string;
    app: string;
    app_version: string;
    last_seen_at: number;
    restaurant_id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId[];
}

const MobileHistorySchema: Schema = new Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
    },
    user_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
    },
    token: {
        type: String,
    },
    name: {
        type: String,
    },
    os: {
        type: String,
    },
    os_version: {
        type: String
    },
    app: {
        type: String
    },
    app_version: {
        type: String
    },
    last_seen_at: {
        type: Number,
    },
}, { timestamps: true });

const MobileHistory = mongoose.model<IMobileHistorySchema>("mobile_history", MobileHistorySchema);

export default MobileHistory;
