import mongoose, { Document, Schema } from 'mongoose';

interface IWebsite extends Document {
    website_section_id: mongoose.Schema.Types.ObjectId;
    file: string;
    file_path: string;
    url: string;
    type: string;
    sort: number;
    intl_name: string;
    intl_description: string;
}

const SectionEntriesSchema: Schema<IWebsite> = new Schema({
    website_section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "website_sections",
    },
    type: {
        type: String,
        default: null,
    },
    file: {
        type: String,
        default: null,
    },
    file_path: {
        type: String,
        default: null,
    },
    url: {
        type: String,
        default: null,
    },
    sort: {
        type: Number,
        default: null,
    },
    intl_name: {
        type: String,
        default: null,
    },
    intl_description: {
        type: String,
        default: null,
    },
}, { timestamps: true });


SectionEntriesSchema.index({ website_section_id: 1 });

const website = mongoose.model<IWebsite>('section_entries', SectionEntriesSchema);
export default website;
