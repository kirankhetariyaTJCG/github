import express from 'express';
import { generateWebsite, loadEntities, getWebsite, dropdownData } from '@Controllers/entityLoaderController';
import { isAuthenticatedUser } from '@Middleware/auth';

const router = express.Router();

router.post("/loader", isAuthenticatedUser, loadEntities);
router.post("/generateWebsite", generateWebsite);
router.get("/website/:key", getWebsite);

router.post("/dropdownData", dropdownData);

export default router;