import mongoose, { Schema, Document } from 'mongoose';

interface IFlyer extends Document {
  title_type: number; // 1.Dine in, 2. Room service, 3. Seat delivery, 4.Suite delivery, 5.Sunbeds, 6.Other, 7.Pickup & consume here
  pdf_url: string | null; // flyer pdf url
  qr_code_pdf_url: string;
  dine_in_subtype_ranges: {
    min: number;
    max: number;
    prefix: string;
    is_char: boolean;
  }[];
  template_type: number; // 1.Same QR code for all tables, 2.Different QR codes for each table
  is_qr_code: boolean;
  is_qr_flyer: boolean | null;
  status: string;
  name: string;
  flyer_bg: string;
  customer_name: string;
  instruction: string;
  restaurant_id: mongoose.Schema.Types.ObjectId;
  promotion_id: mongoose.Schema.Types.ObjectId;
  flyer_pages: {
    headline: string,
    page_number: number,
    image: string,
    flyer_color: string
  }[];
}

const FlyerSchema: Schema = new Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    default: null
  },
  promotion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'promotion',
    default: null
  },
  title_type: {
    type: Number,
    default: null
  },
  pdf_url: {
    type: String,
    default: null
  },
  qr_code_pdf_url: {
    type: String,
    default: null
  },
  dine_in_subtype_ranges: [{
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    is_char: {
      type: Boolean,
      default: null
    },
  }
  ],
  template_type: {
    type: Number,
    default: null
  },
  is_qr_code: {
    type: Boolean,
    default: null
  },
  is_qr_flyer: {
    type: Boolean,
    default: null
  },
  status: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  customer_name: {
    type: String,
    default: null
  },
  flyer_bg: {
    type: String,
    default: null
  },
  flyer_pages: [{
    headline: {
      type: String,
      default: null
    },
    page_number: {
      type: Number,
      default: 1
    },
    image: {
      type: String,
      default: null
    },
    flyer_color: {
      type: String,
      default: null
    }
  }],
  instruction: {
    type: String,
    default: null
  },
}, { timestamps: true });

const Flyer = mongoose.model<IFlyer>('flyer', FlyerSchema);

export default Flyer;
