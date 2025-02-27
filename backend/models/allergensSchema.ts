import mongoose, { Schema, Document } from "mongoose";

export interface IAllergens extends Document {
    mane_id: mongoose.Schema.Types.ObjectId;
    restaurant_id: mongoose.Schema.Types.ObjectId;
    name: string;
    is_default: boolean;
    is_deleted: boolean;
}

const allergensSchema: Schema = new Schema({
    menu_id: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        default: null
      },
    name: {
        type: String,
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

const Allergen = mongoose.model<IAllergens>('allergen', allergensSchema);

export default Allergen;
