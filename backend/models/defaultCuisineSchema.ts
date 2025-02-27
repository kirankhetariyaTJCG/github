import mongoose, { Document, Model, Schema } from "mongoose";

interface ICuisine extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    cuisine_name: string;
    cuisine_image?: string;
    is_popular: boolean;
    is_deleted: boolean;
}

const defaultCuisineSchema = new Schema<ICuisine>(
    {
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurant",
        },
        cuisine_name: {
            type: String,
        },
        cuisine_image: {
            type: String,
        },
        is_popular: {
            type: Boolean,
            default: false,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    }, { timestamps: true, }
);

const DefaultCuisine = mongoose.model<ICuisine>("default_cuisine", defaultCuisineSchema);
export default DefaultCuisine;
