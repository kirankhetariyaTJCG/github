import express from 'express';

import { fetchOrderHistory, fetchMenuDetails, mobileUserLogin, fetchPendingOrder, fetchLoginMobileHistory, sendAppLink } from '@Controllers/webController';

import { isAuthorizeMobile, isAuthenticatedUser } from '@Middleware/auth';

const router = express.Router();

router.post("/menu-details", fetchMenuDetails);

router.post("/login", mobileUserLogin);

router.post("/order-history", isAuthorizeMobile, fetchOrderHistory);
router.post("/pending-order", isAuthorizeMobile, fetchPendingOrder);

router.post("/login-history", isAuthenticatedUser, fetchLoginMobileHistory);
router.post("/send-app-link", isAuthenticatedUser, sendAppLink);

export default router;