import mongoose, { Document, Schema } from 'mongoose';

interface IAddon extends Document {
    menu_id: mongoose.Schema.Types.ObjectId;
    name: string;
    is_optional: boolean;
    allow_quantity: boolean;
    force_min: number;
    force_max: number;
    is_deleted: boolean;
    sort_order: number;
    tax_category_id: mongoose.Schema.Types.ObjectId;
}

const AddonSchema: Schema<IAddon> = new Schema({
    name: {
        type: String,
        required: true,
    },
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
    },
    tax_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tax_rates"
    },
    is_optional: {
        type: Boolean,
        default: false,
    },
    allow_quantity: {
        type: Boolean,
        default: false,
    },
    force_min: {
        type: Number,
        default: 0,
        min: 0,
    },
    force_max: {
        type: Number,
        default: 0,
        min: 0,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    sort_order: {
        type: Number,
    },
}, {
    timestamps: true,
});

AddonSchema.index({ sort_order: 1 });
AddonSchema.index({ menu_id: 1 });

const Addon = mongoose.model<IAddon>('addon', AddonSchema);
export default Addon;
