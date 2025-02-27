import mongoose, { Schema, Document } from "mongoose";

const getFormattedISTTime = () => {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

export interface ILog extends Document {
    method?: string;            // HTTP method (e.g., GET, POST)
    message?: string;           // Any message you want to log (e.g., error, success)
    module?: string;            // Module or service name from which the log originates
    url?: string;               // Request URL
    headers?: mongoose.Schema.Types.Mixed;  // Headers of the request
    request?: mongoose.Schema.Types.Mixed;  // Body or content of the request
    response?: mongoose.Schema.Types.Mixed; // Response content or body
    status?: string;            // Status (e.g., success, error)
    createdAt?: string;
}

const logSchema: Schema = new Schema({
    method: {
        type: String,
    },
    message: {
        type: String,
    },
    module: {
        type: String,
    },
    url: {
        type: String,
    },
    headers: {
        type: Schema.Types.Mixed,
    },
    request: {
        type: Schema.Types.Mixed,
    },
    response: {
        type: Schema.Types.Mixed,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: String,
        default: getFormattedISTTime,
    },
}, { versionKey: false, timestamps: true, });

const Log = mongoose.model<ILog>("log", logSchema);

export default Log;
