import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITaxRates extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    name: string;
    tax_rate: {
        rate_pickup: number;
        rate_delivery: number;
        rate_preserve: number;
    };
    is_deleted: boolean
}

const taxRateSchema = new Schema<ITaxRates>({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
    },
    name: {
        type: String,
        trim: true,
    },
    tax_rate: {
        rate_pickup: {
            type: Number,
        },
        rate_delivery: {
            type: Number,
        },
        rate_preserve: {
            type: Number,
        },
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

taxRateSchema.index({ restaurant_id: 1 });

const TaxRates: Model<ITaxRates> = mongoose.model<ITaxRates>("tax_rates", taxRateSchema);
export default TaxRates;
