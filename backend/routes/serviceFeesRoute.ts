import express from "express";
import { fetchServiceFees, manageServiceFees } from "../controllers/serviceFeesController";
import { isAuthenticatedUser } from "../middleware/auth";

const router = express.Router();

router.post("/manage", isAuthenticatedUser, manageServiceFees);
router.post("/fetch", isAuthenticatedUser, fetchServiceFees);


export default router;