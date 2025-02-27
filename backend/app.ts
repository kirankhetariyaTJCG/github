import express, { Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import User from "@Routes/userRoute";
import Restaurants from "@Routes/restaurantRoute";
import Menu from "@Routes/menuRoute";
import Owner from "@Routes/ownerRoute";
import Reseller from "@Routes/reseller/resellerRoute";
import Loader from "@Routes/entityLoaderRoute";
import Tag from "@Routes/tagRoute";
import Cart from "@Routes/cartRoute";
import Customer from "@Routes/customerRoute";
import Notification from "@Routes/notificationRoute";
import Flyer from "@Routes/flyerRoute";
import Website from "@Routes/websiteRoute";
import Report from "@Routes/reportRoute";
import Web from "@Routes/webRoute";
import Permissions from "@Routes/permissionsRoute";
import ServiceFees from "@Routes/serviceFeesRoute";
import { markMissedOrders, sendCampaignInvites, updateAvailabilityStatus, updateVisibility } from "@Utils/cronjobs";
import errorMiddleware from "@Middleware/errors";
import webhooksRoute from "@Utils/webhooks/stripe";
import '@Config/sentry';

const cron = require('node-cron');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", User);
app.use("/api/v1/restaurants", Restaurants);
app.use("/api/v1/menu", Menu);
app.use("/api/v1/owner", Owner);
app.use("/api/v1/reseller", Reseller);
app.use("/api/v1", Loader);
app.use("/api/v1", Tag);
app.use("/api/v1", Cart);
app.use("/api/v1", Customer);
app.use("/api/v1", Notification);
app.use("/api/v1/flyer", Flyer);
app.use("/api/v1/website", Website);
app.use("/api/v1/webhook", webhooksRoute);
app.use("/api/v1", Report);
app.use("/api/v1/web", Web);
app.use("/api/v1/permissions", Permissions);
app.use("/api/v1/service-fees", ServiceFees);

// Root endpoint to check server status
app.get("/api", (req: Request, res: Response) => {
  res.send("Server is working");
});

// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '1ROOS APIs Documentation',
    version: '1.0.0',
    description: 'This is Local APIs Server.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local server',
    },
    {
      url: 'https://1roos.com',
      description: 'Live Dev server',
    }
  ],
};

// Swagger options
const options: Options = {
  swaggerDefinition,
  apis: ['./SwaggerAPIDocs/swaggerDocumentUI.ts'], // Path to your Swagger API docs
};

// Generate Swagger spec
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI using swagger-ui-express
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    requestInterceptor: (req: any) => {
      const token = 'YOUR_DEFAULT_TOKEN'; // Replace with your actual token
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    },
  }
},));

// Serve static files from the uploads folder
app.use('/api/v1/uploads', express.static(path.join(__dirname, "../uploads/")));

// Serve the Swagger JSON specification
app.get('/swagger.json', (req: Request, res: Response) => {
  res.json(swaggerSpec);
});

// Middleware for Errors
app.use(errorMiddleware);

// Schedule a cron job to run every 1 minutes
cron.schedule('*/1 * * * *', async () => {

  await sendCampaignInvites()
  await updateVisibility()
});

// Schedule a cron job to run every hour
cron.schedule('0 * * * *', async () => {

  await updateAvailabilityStatus()
});

// Schedule to run every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  await markMissedOrders();
});

export default app;
