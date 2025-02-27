import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
    menu_id: mongoose.Schema.Types.ObjectId
    user_id: mongoose.Schema.Types.ObjectId
    name: string;
    description: string;
    image: string;
    addons: mongoose.Types.ObjectId[];
    is_deleted: boolean,
    sort_order: number;
    hide_instructions: boolean;
    is_active: boolean | null;
    is_visible: boolean;
    active_begin: number | null;
    active_end: number | null;
    active_days: [number];
    active_exact_from: number | null;
    active_exact_until: number | null;
    hidden_until: number | null;
    menu_item_kitchen_internal_name: string | null;
}

const CategorySchema: Schema<ICategory> = new Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    addons: [{
        type: Schema.Types.ObjectId,
        ref: 'addon',
    }],
    is_deleted: {
        type: Boolean,
        default: false
    },
    sort_order: {
        type: Number,
    },
    is_active: {
        type: Boolean,
        default: null
    },
    is_visible: {
        type: Boolean,
        default: true
    },
    active_begin: {
        type: Number,
        default: null
    },
    active_end: {
        type: Number,
        default: null
    },
    active_days: {
        type: [Number],
        default: null // Days of the week (0 = Sunday, 6 = Saturday)
    },
    hidden_until: {
        type: Number,
        default: null
    },
    hide_instructions: {
        type: Boolean,
        default: false
    },
    active_exact_from: {
        type: Number,
        default: null
    },
    active_exact_until: {
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

CategorySchema.index({ addons: 1 });
CategorySchema.index({ menu_id: 1 });

const Category = mongoose.model<ICategory>('category', CategorySchema);
export default Category;
