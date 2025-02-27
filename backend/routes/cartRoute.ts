import express from 'express';
import { addToCart, getCart, getPromotionData, managePromotion, removeCart, addOrder, getOrderHistory, updateOrderStatus, getPaymentLink, getClientSecret, paymentResponse, promotionDropdown, findOrderById, applyCoupon } from '@Controllers/cartController';
import { isAuthenticatedUser } from '@Middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { cartValidation } from '@Validation/cartValidation';
import { uploadFile } from "@Utils/multer";

let multerUploadFile: any = uploadFile.uploadFiles("cart");
const router = express.Router();



router.post("/manage-promotion", isAuthenticatedUser, multerUploadFile.single('promotion_image'), managePromotion);
router.post("/promotion", isAuthenticatedUser, getPromotionData);
router.post("/promotion-dropdown", isAuthenticatedUser, promotionDropdown);

router.post("/apply-coupon", applyCoupon);

// Cart
router.post("/add-cart", addToCart);
router.post("/remove-cart", removeCart);
router.post("/cart", getCart);

// order
router.post("/order", addOrder);
router.post("/order/history", getOrderHistory);
router.post("/order/find-by-id", findOrderById);
router.post("/order/status", isAuthenticatedUser, updateOrderStatus);

router.post("/payment-link", getPaymentLink);

router.post("/client-secret", getClientSecret);
router.post("/payment-response", paymentResponse);

export default router;