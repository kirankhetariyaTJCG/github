import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOwner extends Document {
    brand_name: string;
    owner_id: mongoose.Schema.Types.ObjectId;
    restaurants: mongoose.Schema.Types.ObjectId[];
    reseller_id: mongoose.Schema.Types.ObjectId;
}

const ownerSchema = new Schema<IOwner>(
    {
        brand_name: {
            type: String,
            required: true,
            minLength: [3, "Brand name must be at least 3 characters long"],
            maxLength: [100, "Brand name cannot exceed 100 characters"],
            trim: true,
        },
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        restaurants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurant',
        }],
        reseller_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reseller',
        },
    },
    { timestamps: true })

ownerSchema.index({ ownerId: 1, brandName: 1, resellerUserId: 1 });

// Create and export the Owner model
const Owner: Model<IOwner> = mongoose.model<IOwner>("owner", ownerSchema);
export default Owner;