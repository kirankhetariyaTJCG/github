import mongoose, { Schema, Document } from "mongoose";

export interface ISize extends Document {
  item_id: mongoose.Types.ObjectId
  name: string;
  price: number;
  is_pre_select: boolean;
  addons: mongoose.Types.ObjectId[];
  is_deleted: boolean;
  nutritional_values: string,
  nutritional_values_size: string
}

const sizeSchema: Schema = new Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item"
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_pre_select: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  addons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addon',
  }],
  nutritional_values: {
    type: String,
    default: null
  },
  nutritional_values_size: {
    type: String,
    default: null
  }
}, { timestamps: true });

sizeSchema.index({ item_id: 1 });
sizeSchema.index({ addons: 1 });

export default mongoose.model<ISize>("size", sizeSchema);
