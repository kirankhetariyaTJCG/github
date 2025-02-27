import express, { Request, Response } from 'express';
import { addOrEditTag, tagList } from '../controllers/tagController';

import { isAuthenticatedUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { tagValidation } from '@Validation/tagValidation';

const router = express.Router();

router.post("/tag", isAuthenticatedUser, validateRequest(tagValidation.addEditSchema), addOrEditTag);
router.post("/tags", isAuthenticatedUser, tagList);


export default router;
