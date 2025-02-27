import mongoose, { Schema, Document, Types } from "mongoose";

export interface IItemsExtraDetail extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    menu_id: mongoose.Schema.Types.ObjectId;
    name: string;
    type: number; // 1.ALLERGEN, 2. NUTRITIONAL_VALUE
    is_default: boolean;
    is_deleted: boolean;
}

const ItemsExtraDetailSchema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        default: null
    },
    name: {
        type: String,
        default: null
    },
    type: {
        type: Number,
        default: null
    },
    is_default: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const ItemsExtraDetail = mongoose.model<IItemsExtraDetail>('items_extra_detail', ItemsExtraDetailSchema);

export default ItemsExtraDetail;
