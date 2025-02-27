import express from 'express';
import { campaignList, manageCampaign } from '@Controllers/notificationController';
import { isAuthenticatedUser } from '@Middleware/auth';

const router = express.Router();

router.post("/campaign", isAuthenticatedUser, manageCampaign);
router.post("/campaigns", isAuthenticatedUser, campaignList);


export default router;