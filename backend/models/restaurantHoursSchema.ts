import mongoose, { Document, Schema, Model } from "mongoose";

interface IOpeningHour {
  start_time: number;
  end_time: number;
}

interface IServiceDetails {
  message?: string; // Message related to the service
  start_date?: number; // Start date for holidays or special hours
  end_date?: number; // End date for holidays or special hours
  affected_services?: string[]; // List of affected services during this period
  pause_type?: number; // 0: All services, 1: Specific services
  specific_services?: number[]; // Array of service IDs to pause if pause_type is 1
}

interface IRestaurantHours extends Document {
  restaurant_id: mongoose.Schema.Types.ObjectId; // Reference to the restaurant
  hours: {
    day: number; // 0: Sunday, 1: Monday, ..., 6: Saturday
    hours: IOpeningHour[]; // Array of opening hours for the day
    is_selected?: boolean;
  }[];
  services: number; // Service type (0: Opening Hours, 1: Pickup service, etc.)
  details?: IServiceDetails; // Additional details related to services
  is_same_as_opening_hours:boolean
}

const RestaurantHoursSchema: Schema<IRestaurantHours> = new Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      default: null
    },
    services: {
      type: Number,
      default: null
    },
    hours: {
      type: [
        {
          day: {
            type: Number,
            default: null
          }, // 0: Sunday, 1: Monday, etc.
          hours: [
            {
              start_time: { type: Number, default: null },
              end_time: { type: Number, default: null },
            },
          ],
          is_selected: { type: Boolean, default: true },
        },
      ],
    },
    details: {
      message: { type: String, default: null }, // Related message for holidays or special hours
      start_date: { type: Number, default: null }, // Start date for holiday or special hours
      end_date: { type: Number, default: null }, // End date for holiday or special hours
      affected_services: { type: [String], default: null }, // List of affected services
      pause_type: { type: Number, default: null }, // 0: all, 1: specific
      specific_services: { type: [Number], default: null }, // Array of specific services to pause
    },
    is_same_as_opening_hours: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);


RestaurantHoursSchema.index({ restaurant_id: 1 });
const RestaurantHours: Model<IRestaurantHours> = mongoose.model<IRestaurantHours>("restaurant_hours", RestaurantHoursSchema);

export default RestaurantHours;
