import mongoose, { Document, Schema } from 'mongoose';

interface IWebsite extends Document {
    restaurant_id: mongoose.Schema.Types.ObjectId;
    preview_url: string;
    is_active: boolean;
    website_sections: string;
    color_scheme: string;
    font_type: number;
    navigation_type: number;
    page_type: number;
    previewType: number;
}

const WebsiteSchema: Schema<IWebsite> = new Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
    },
    preview_url: {
        type: String,
        default: null,
    },
    is_active: {
        type: Boolean,
        default: null,
    },
    website_sections: {
        type: String,
        default: null,
    },
    color_scheme: {
        type: String,
        default: null,
    },
    font_type: {
        type: Number,
        default: 1,
    },
    navigation_type: {
        type: Number,
        default: 2,
    },
    page_type: {
        type: Number,
        default: 1,
    },
    previewType: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });


WebsiteSchema.index({ restaurant_id: 1 });
WebsiteSchema.index({ preview_url: 1 });

const website = mongoose.model<IWebsite>('website', WebsiteSchema);
export default website;
