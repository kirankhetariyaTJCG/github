import express from "express";
import { addAddon, addCategory, addChoice, addItem, addSize, changeCategoryPosition, changeChoicePosition, deleteAddon, deleteCategory, deleteChoice, deleteItem, deleteSize, editAddon, editCategory, editChoice, editItem, changeItemPosition, editSize, getAllAddons, getAllCategories, changeAddonPosition, getMenuData, addOrEditMenu, manageItem, updateMenuStatus, manageVisibility, duplicateEntity, manageAllergens, getAllergens, deleteAllergens, manageItemsExtraDetail, deleteItemsExtraDetail, getAllItemsExtraDetail, userCreatedMenu, getMenuDetails, saveNutritionalValues, getNutritionalValues, deleteNutritionalValues, getstoreMenu } from "../controllers/menuController";
import { isAuthenticatedUser } from "../middleware/auth";
import { uploadFile } from "@Utils/multer";
import { validateRequest } from '@Middleware/validateRequest';
import { restaurantValidation } from '@Validation/restaurantValidation';
import { menuValidation } from '@Validation/menuValidation';

let multerUploadFile: any = uploadFile.uploadFiles("menu");
const router = express.Router();

// Addon
router.post("/addon", isAuthenticatedUser, addAddon);
router.post("/edit-addon", isAuthenticatedUser, editAddon);
router.post("/delete-addon", isAuthenticatedUser, deleteAddon);
router.post("/addons", isAuthenticatedUser, getAllAddons);
router.post("/addon-position", isAuthenticatedUser, changeAddonPosition);

// Choice
router.post("/choice", isAuthenticatedUser, addChoice);
router.post("/edit-choice", isAuthenticatedUser, editChoice);
router.post("/delete-choice", isAuthenticatedUser, deleteChoice);
router.post("/choice-position", isAuthenticatedUser, changeChoicePosition);

// Category
router.post('/category', isAuthenticatedUser, multerUploadFile.single('image'), addCategory);
router.post('/edit-category', isAuthenticatedUser, multerUploadFile.single('image'), editCategory);
router.post('/delete-category', isAuthenticatedUser, deleteCategory);
router.post('/getAllCategories', isAuthenticatedUser, getAllCategories);
router.post('/category-position', isAuthenticatedUser, changeCategoryPosition);


// item
router.post("/add-item", isAuthenticatedUser, multerUploadFile.single('image'), addItem);
router.post("/item", isAuthenticatedUser, multerUploadFile.single('image'), manageItem);
router.post("/edit-item", isAuthenticatedUser, multerUploadFile.single('image'), editItem);
router.post("/item-position", isAuthenticatedUser, changeItemPosition);
router.post("/delete-item", isAuthenticatedUser, deleteItem);

// size
router.post("/size", isAuthenticatedUser, addSize);
router.post("/edit-size", isAuthenticatedUser, editSize);
router.post("/delete-size", isAuthenticatedUser, deleteSize);

// menu
router.post("/menu", isAuthenticatedUser, addOrEditMenu);
router.post("/menu/data", isAuthenticatedUser, getMenuData);
router.post("/user-created-menu", isAuthenticatedUser, userCreatedMenu);
router.post("/menu-details", isAuthenticatedUser, getMenuDetails);

// Allergens
router.post("/manageAllergens", isAuthenticatedUser, manageAllergens);
router.post("/getAllergens", isAuthenticatedUser, getAllergens);
router.post("/deleteAllergens", isAuthenticatedUser, deleteAllergens);

router.post("/manageVisibility", isAuthenticatedUser, manageVisibility);
router.post("/duplicate", isAuthenticatedUser, duplicateEntity);

router.post("/items-extra-detail", isAuthenticatedUser, manageItemsExtraDetail);
router.post("/delete-items-extra-detail", isAuthenticatedUser, deleteItemsExtraDetail);
router.post("/items-extra-details", isAuthenticatedUser, getAllItemsExtraDetail);


router.post("/saveNutritionalValues", isAuthenticatedUser, saveNutritionalValues);
router.post("/getNutritionalValues", isAuthenticatedUser, getNutritionalValues);
router.post("/deleteNutritionalValues", isAuthenticatedUser, deleteNutritionalValues);

router.post("/getstoreMenu", getstoreMenu);

// Public API Calls
router.post("/menuDetails", getMenuDetails);

export default router;