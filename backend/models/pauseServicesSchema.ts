import mongoose, { Document, Schema, Model } from "mongoose";

interface Interval {
    type?: string;
    hours: {
        start_time?: number;
        end_time?: number;
    }[]
}

interface IPauseServicesSchema extends Document {
    restaurant_id: mongoose.Types.ObjectId;
    start_date?: number;
    end_date?: number;
    name?: string;
    message?: string;
    type?: string;
    intervals?: Interval[];
}

const PauseServicesSchema: Schema<IPauseServicesSchema> = new Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
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
    name: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        trim: true,
        default: null,
    },
    type: {
        type: String,
        default: null,
    },
    intervals: [{
        type: {
            type: String,
            default: null,
        },
        hours: [{
            start_time: {
                type: Number,
                default: null,
            },
            end_time: {
                type: Number,
                default: null,
            },
        }],
    }],
}, { timestamps: true });

PauseServicesSchema.index({ restaurant_id: 1 });

const PauseServices: Model<IPauseServicesSchema> = mongoose.model<IPauseServicesSchema>(
    "pause_services",
    PauseServicesSchema
);

export default PauseServices;
