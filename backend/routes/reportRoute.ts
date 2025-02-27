import express, { Request, Response } from 'express';
import { categoryItemSalesData, customerOrderSummary } from '../controllers/reportController';

import { isAuthenticatedUser } from '../middleware/auth';
import { uploadFile } from '@Utils/multer';

const router = express.Router();


router.post("/orders/customer-summary", customerOrderSummary);
router.post("/sales/category-item", categoryItemSalesData);

export default router;