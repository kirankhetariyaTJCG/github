import mongoose, { Document, Schema } from 'mongoose';

interface IWebsiteSectionsSchema extends Document {
    website_id: mongoose.Schema.Types.ObjectId;
    type: string;
    mandatory: boolean;
    sort: number;
    navigation_sort: number;
    subtype: string;
    intl_name: string;
    intl_description: string;
    file_path: string;
    website_section_pictures: {
        file_name: string;
        file_title: string;
        file_path: string;
        file_type: string;
    }[];
    website_section_entries: any
}

const WebsiteSections: Schema<IWebsiteSectionsSchema> = new Schema({
    website_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "website",
    },
    type: {
        type: String,
        default: null
    },
    mandatory: {
        type: Boolean,
        default: false
    },
    sort: {
        type: Number,
        default: 0
    },
    navigation_sort: {
        type: Number,
        default: 0
    },
    subtype: {
        type: String,
        default: null
    },
    intl_name: {
        type: String,
        default: null
    },
    intl_description: {
        type: String,
        default: null
    },
    file_path: {
        type: String,
        required: true
    },
    website_section_pictures: [{
        file_name: {
            type: String,
            required: true
        },
        file_title: {
            type: String,
            required: true
        },
        file_path: {
            type: String,
            required: true
        },
        file_type: {
            type: String,
            required: true
        }
    }],
    website_section_entries: [{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }]
}, { timestamps: true });

WebsiteSections.index({ website_id: 1 });

const website = mongoose.model<IWebsiteSectionsSchema>('website_sections', WebsiteSections);
export default website;
