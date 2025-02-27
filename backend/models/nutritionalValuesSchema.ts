import mongoose, { Schema, Document, Types } from "mongoose";

export interface INutritionalValues extends Document {
    size_id: mongoose.Types.ObjectId;
    item_id: mongoose.Types.ObjectId;
    extras: {
        items_extra_detail_id: string;
        value: number;
    }[];
    nutritional_values_size: string;
    is_deleted: boolean;
}

const NutritionalValuesSchema: Schema = new Schema<INutritionalValues>({
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "size",
        default: null,
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        default: null,
    },
    extras: [
        {
            items_extra_detail_id: {
                type: Schema.Types.ObjectId,
                ref: "items_extra_detail",
                default: null,
            },
            value: {
                type: Number,
                default: null,
            },
        },
    ],
    nutritional_values_size: {
        type: String,
        default: null,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

NutritionalValuesSchema.index({ item_id: 1 });

export default mongoose.model<INutritionalValues>("nutritional_values", NutritionalValuesSchema);
