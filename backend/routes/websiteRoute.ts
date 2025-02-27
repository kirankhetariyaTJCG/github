import express, { Request, Response } from 'express';
import { deleteWebsiteSections, generateWebsite, manageWebsiteSections, previewWebsite, manageSectionEntries, fetchWebsite } from '../controllers/websiteController';

import { isAuthenticatedUser } from '../middleware/auth';
import { uploadFile } from '@Utils/multer';

let multerUploadFile: any = uploadFile.uploadFiles("website");
const router = express.Router();


router.post("/generate-website", isAuthenticatedUser, generateWebsite);
router.post("/fetch-website", isAuthenticatedUser, fetchWebsite);
router.post("/sections", isAuthenticatedUser, manageWebsiteSections);
router.post("/sections-entries", isAuthenticatedUser, multerUploadFile.single('file_path'), manageSectionEntries);
router.post("/sections-delete", isAuthenticatedUser, deleteWebsiteSections);
router.get("/init/:preview_url", previewWebsite);

export default router;