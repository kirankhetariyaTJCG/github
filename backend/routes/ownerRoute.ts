import express from 'express';

import { addRestaurant, createCompany, getCompanyDetails } from '../controllers/ownerController';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth';

const router = express.Router();

router.route("/create-owner").post(isAuthenticatedUser, authorizeRoles('manager'), createCompany);
router.route("/owner-details").post(isAuthenticatedUser, authorizeRoles('owner'), getCompanyDetails);
router.route("/add-restaurant").post(isAuthenticatedUser, authorizeRoles('owner'), addRestaurant);

export default router;