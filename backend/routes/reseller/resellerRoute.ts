import express from 'express';

import { authorizeRoles, isAuthenticatedUser } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';

import { addRestaurent, createCompany } from '../../controllers/reseller/resellerController';

import { addRestaurantSchema, createCompanySchema } from '../../validation/resellerValidation';


const router = express.Router();

router.route("/add-restaurent").post(isAuthenticatedUser, validateRequest(addRestaurantSchema), addRestaurent);
router.route("/create-company").post(isAuthenticatedUser, validateRequest(createCompanySchema), createCompany);

export default router;