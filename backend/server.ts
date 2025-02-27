// Load environment variables from config.env
import * as dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '@Config/database';
import { constants } from '@Utils/constant';
import app from './app';

// Handling Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

// Connecting to the database
connectDB();

// Start the server
const port = parseInt(constants.PORT as string, 10) || 4000;
const server = app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

// Handling Unhandled Promise Rejections
process.on('unhandledRejection', (err: Error) => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down the server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});
