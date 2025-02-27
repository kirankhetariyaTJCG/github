import mongoose, { Schema, Document } from "mongoose";

interface ITableReservation extends Document {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    reservation_date: number; // Date of reservation
    reservation_time: number; // Time of reservation
    number_of_guests: number;
    table_type: number; //  1.Window, 2.Booth, 3.Outdoor
    special_requests?: string; // Any special requests from the customer
    status: number; // 1.Pending, 2.Confirmed, 3.Cancelled, 4.No-show
    customer_notes?: string;
    reservation_code: string;
    is_online: boolean; // Indicates if the reservation was made online or in-person
    is_confirmed: boolean;
    confirmed_at?: number;
    cancelled_at?: number;
    cancel_reason?: string;
    created_by?: string;
}


const TableReservationSchema = new Schema<ITableReservation>({
    customer_name: {
        type: String,
        default: null
    },
    customer_phone: {
        type: String,
        default: null
    },
    customer_email: {
        type: String,
        default: null
    },
    reservation_date: {
        type: Number,
        default: null
    },
    reservation_time: {
        type: Number,
        default: null
    },
    number_of_guests: {
        type: Number,
        default: null
    },
    table_type: {
        type: Number,
        default: null
    },
    special_requests: {
        type: String, default: null
    },
    status: {
        type: Number,
        default: null
    },
    customer_notes: {
        type: String,
        default: null
    },
    reservation_code: {
        type: String,
        default: null
    },
    is_online: {
        type: Boolean,
        default: false
    },
    is_confirmed: {
        type: Boolean,
        default: false
    },
    confirmed_at: {
        type: Number,
        default: null
    },
    cancelled_at: {
        type: Number,
        default: null
    },
    cancel_reason: {
        type: String,
        default: null
    },
    created_by: {
        type: String,
        default: null
    },
}, { timestamps: true });


const TableReservation = mongoose.model<ITableReservation>("table_reservation", TableReservationSchema);

export { TableReservation };
