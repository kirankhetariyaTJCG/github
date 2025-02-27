import mongoose, { Document, Schema } from 'mongoose';

interface IChoice extends Document {
    addon_id: mongoose.Schema.Types.ObjectId;
    name: string;
    price: number;
    is_pre_selected: boolean;
    is_deleted: boolean;
    sort_order: number;
    out_of_stock: boolean | null;
    out_of_stock_next_day: number | null;
    out_of_stock_until: number | null;
    menu_item_kitchen_internal_name: string | null;
}

const ChoiceSchema: Schema<IChoice> = new Schema({
    addon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addon',
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    is_pre_selected: {
        type: Boolean,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    sort_order: {
        type: Number,
    },
    out_of_stock: {
        type: Boolean,
        default: false
    },
    out_of_stock_next_day: {
        type: Number,
        default: null
    },
    out_of_stock_until: {
        type: Number,
        default: null
    },
    menu_item_kitchen_internal_name: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

const Choice = mongoose.model<IChoice>('choice', ChoiceSchema);

export default Choice;
