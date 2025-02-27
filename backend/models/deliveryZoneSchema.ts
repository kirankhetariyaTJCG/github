import mongoose, { Document, Model, Schema } from "mongoose";

interface IDeliveryZone extends Document {
  color: string;
  delivery_fee: number;
  minimum_order: number;
  name: string;
  restaurant_id: mongoose.Schema.Types.ObjectId;
  shape_json: string;
  zone_type: number; // 0.circle  1.polygon
  usage: number; // 0.delivery, 1.pickup
  is_active: boolean;
}

const deliveryZoneSchema: Schema<IDeliveryZone> = new Schema({
  color: {
    type: String,
  },
  delivery_fee: {
    type: Number,
  },
  minimum_order: {
    type: Number,
  },
  name: {
    type: String,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
  },
  shape_json: {
    type: String,
  },
  zone_type: {
    type: Number,
  },
  usage: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const DeliveryZone: Model<IDeliveryZone> = mongoose.model<IDeliveryZone>("delivery_zone", deliveryZoneSchema);

export default DeliveryZone;
