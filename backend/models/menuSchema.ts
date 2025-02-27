import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document {
    category_id: mongoose.Schema.Types.ObjectId[];
    user_id: mongoose.Schema.Types.ObjectId;
    name: string;
    is_active: boolean;
    is_deleted: boolean;
    description: string;
}

const menuSchema: Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category_id: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
    }],
    name: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

menuSchema.index({ user_id: 1 });

const Menu = mongoose.model<IMenu>('menu', menuSchema);

export default Menu;
