import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  category_id: mongoose.Schema.Types.ObjectId[] | null;
  tax_category_id: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[] | null;
  addons: mongoose.Types.ObjectId[];
  image: string;
  name: string;
  description: string;
  price: number;
  is_variant: boolean;
  is_deleted: boolean;
  sort_order: number;
  sort: number;
  hide_instructions: boolean;
  ingredients: string | null;
  additives: string | null;
  allergens: mongoose.Schema.Types.ObjectId[] | null;
  is_active: boolean | null;
  is_visible: boolean;
  active_begin: number | null;
  active_end: number | null;
  active_days: [number];
  active_exact_from: number | null;
  active_exact_until: number | null;
  hidden_until: number | null;
  menu_item_kitchen_internal_name: string | null;
  nutritional_values: string | null;
  nutritional_values_size: string | null;
  out_of_stock: boolean | null;
  out_of_stock_next_day: number | null;
  out_of_stock_until: number | null;
  menu_item_order_types: [string];
}

const itemSchema: Schema = new Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    tax_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tax_rates"
    },
    addons: [{
      type: Schema.Types.ObjectId,
      ref: 'addon',
    }],
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "tag",
      default: null
    }],
    image: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    is_variant: {
      type: Boolean,
      default: null,
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    sort_order: {
      type: Number,
      default: null
    },
    is_active: {
      type: Boolean,
      default: null
    },
    is_visible: {
      type: Boolean,
      default: true
    },
    active_begin: {
      type: Number,
      default: null
    },
    active_end: {
      type: Number,
      default: null
    },
    active_days: {
      type: [Number],
      default: null
    },
    hidden_until: {
      type: Number,
      default: null
    },
    hide_instructions: {
      type: Boolean,
      default: false
    },
    active_exact_from: {
      type: Number,
      default: null
    },
    active_exact_until: {
      type: Number,
      default: null
    },
    ingredients: {
      type: String,
      default: null
    },
    additives: {
      type: String,
      default: null
    },
    items_extra_detail_id: [{
      type: Schema.Types.ObjectId,
      ref: 'items_extra_detail',
      default: null
    }],
    menu_item_kitchen_internal_name: {
      type: String,
      default: null
    },
    nutritional_values: {
      type: String,
      default: null
    },
    nutritional_values_size: {
      type: String,
      default: null
    },
    out_of_stock: {
      type: Boolean,
      default: false
    },
    out_of_stock_next_day: {
      type: Number,
      default: null
    },
    out_of_stock_until: {
      type: Number,
      default: null
    },
    menu_item_order_types: {
      type: [String],
      default: null
    },
  }, { timestamps: true });

itemSchema.index({ addons: 1 });
itemSchema.index({ tags: 1 });

const Item = mongoose.model<IItem>('item', itemSchema);

export default Item;
