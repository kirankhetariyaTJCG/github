// Core and Third-Party Libraries
import mongoose from "mongoose";
import * as Sentry from '@sentry/node';

// Utils and Helpers
import { constants } from "@Utils/constant";

// Function to connect to the MongoDB database
export const connectDB = async () => {
  mongoose
    .connect(constants.DB_URL as string)
    .then((data) => {
      console.log("✅ Database connected successfully.");

    }).catch((error) => {
      Sentry.captureException(error);
      console.error(`❌ Failed to connect to the database. Please check your connection settings. ${error.messages}`);
      process.exit(1);
    });
};