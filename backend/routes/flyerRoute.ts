import express from "express";
import { deleteFlyer, flyerList, generateQRCode, manageFlyer, manageFlyerPages } from "../controllers/flyerController";
import { isAuthenticatedUser } from "../middleware/auth";
import { uploadFile } from "@Utils/multer";

let multerUploadFile: any = uploadFile.uploadFiles("flyers");

const router = express.Router();

router.post("/flyer", isAuthenticatedUser, manageFlyer);
router.post("/flyer-page", isAuthenticatedUser, multerUploadFile.single('image'), manageFlyerPages);
router.post("/flyers", isAuthenticatedUser, flyerList);
router.post("/QR-code", isAuthenticatedUser, generateQRCode);
router.post("/delete", isAuthenticatedUser, deleteFlyer);


export default router;