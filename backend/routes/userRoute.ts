import express, { Request, Response } from 'express';
import { forgotPassword, intro, loginUser, logout, refreshToken, registerUser, resetPassword, sendVerificationEmail, verifyEmail, changeEmail, requestEmailChange, updateUserProfile, createPassword, updateWebsite, getUserWebsite, uploadImage, removeFile, uploadMultiImage, deleteUser, userList, getUserById, changePassword, fetchDistances } from '../controllers/userController';

import { isAuthenticatedUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { userValidation } from '@Validation/userValidation';
import { uploadFile } from "@Utils/multer";

let multerUploadFile: any = uploadFile.uploadFiles("user");
const router = express.Router();

// Introduction APIs
router.route("/intro").get(intro);

// user APIs
router.post("/register", validateRequest(userValidation.registerUserSchema), registerUser);
router.post("/login", validateRequest(userValidation.userLoginSchema), loginUser);
router.post("/updateProfile", isAuthenticatedUser, multerUploadFile.single('profile_image'), validateRequest(userValidation.updateProfileSchema), updateUserProfile);
router.post("/deleteUser", isAuthenticatedUser, validateRequest(userValidation.userIdSchema), deleteUser);
router.post("/getUserById", isAuthenticatedUser, validateRequest(userValidation.userIdSchema), getUserById);

router.post("/sendVerificationEmail", validateRequest(userValidation.emailSchema), sendVerificationEmail);
router.post("/verifyEmail", validateRequest(userValidation.verifyEmailSchema), verifyEmail);
router.post("/requestEmailChange", validateRequest(userValidation.userIdSchema), requestEmailChange);
router.post("/changeEmail", validateRequest(userValidation.changeEmailSchema), changeEmail);

router.post("/forgotPassword", validateRequest(userValidation.forgotPasswordSchema), forgotPassword);
router.post("/resetPassword", validateRequest(userValidation.resetPasswordSchema), resetPassword);
router.post("/createPassword", validateRequest(userValidation.createPasswordSchema), createPassword);
router.post("/change-password", changePassword);

router.post("/updateWebsite", isAuthenticatedUser, validateRequest(userValidation.updateWebsiteSchema), updateWebsite);
router.post("/getUserWebsite", isAuthenticatedUser, validateRequest(userValidation.userIdSchema), getUserWebsite);

router.post("/uploadImage", isAuthenticatedUser, multerUploadFile.single('file'), uploadImage);
router.post("/uploadMultiImage", isAuthenticatedUser, multerUploadFile.array('file'), uploadMultiImage);
router.post("/removeFile", isAuthenticatedUser, validateRequest(userValidation.removeFileSchema), removeFile);

router.route("/logout").get(isAuthenticatedUser, logout);
router.post("/refresh-token", refreshToken);
router.get("/userList", userList);


router.post("/fetchDistances", fetchDistances);

export default router;