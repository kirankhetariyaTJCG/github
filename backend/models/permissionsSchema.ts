import mongoose, { Document, Schema } from 'mongoose';

interface IPermissions extends Document {
    module: string;
    title: string;
    slug: string;
    position: number;
    is_default: boolean;
}

const PermissionsSchema: Schema<IPermissions> = new Schema({
    module: {
        type: String,
    },
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    position: {
        type: Number,
    },
    is_default: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


const Permissions = mongoose.model<IPermissions>('permissions', PermissionsSchema);
export default Permissions;
