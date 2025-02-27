import mongoose, { Schema, Document } from 'mongoose';

interface ITag extends Document {
    // restaurant_id: mongoose.Schema.Types.ObjectId,
    tag_name: string,
    icon_image: string,
    is_active: boolean,
    is_deleted: boolean,
}

const TagSchema: Schema = new Schema({
    // restaurant_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "restaurant",
    // },
    tag_name: {
        type: String,
        default: null
    },
    icon_image: {
        type: String,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


TagSchema.index({ tag_name: 1 })

const Tag = mongoose.model<ITag>('tag', TagSchema);
export default Tag;
