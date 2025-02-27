import express from 'express';
import { addTaxRate, deleteTaxRate, getAllTaxRates, getRestaurantById, manageRestaurantServiceSchedules, updateRestaurant, editTaxRate, verifyDomain, getRestaurantServiceSchedules, handleDocument, getDocumentById, restaurantServiceSchedules, getRestaurantDetails, getPauseServices, managePauseServices, deletePauseServices, getRestaurantStripe, fetchPrivacyAndTerms } from '@Controllers/restaurantController';
import { isAuthenticatedUser } from '../middleware/auth';
import { addDeliveryZone, deleteDeliveryZone, editDeliveryZone, viewDeliveryZones } from '@Controllers/deliveryZoneController';
import { getAllCountries, getCitiesByStateAndCountry, getStatesByCountryId } from '@Controllers/countryStateCityController';
import { addCuisine, fetchCuisines, deleteCuisine, editCuisine, manageDefaultCuisine, fetchDefaultCuisine } from "@Controllers/cuisineController";
import { uploadFile } from "@Utils/multer";
import { restaurantValidation } from '@Validation/restaurantValidation';
import { cuisineValidation } from '@Validation/cuisineValidation';
import { validateRequest } from '@Middleware/validateRequest';

let multerUploadFile: any = uploadFile.uploadFiles("restaurant");

const router = express.Router();

// Restaurant
router.post("/getRestaurantById", isAuthenticatedUser, getRestaurantById);
router.post("/init", getRestaurantDetails);
router.post("/update-restaurant", isAuthenticatedUser, updateRestaurant);

router.post("/service-schedule", isAuthenticatedUser, manageRestaurantServiceSchedules);
router.post("/service-schedule-get", isAuthenticatedUser, getRestaurantServiceSchedules);
router.post("/service-schedules", isAuthenticatedUser, restaurantServiceSchedules);

// tax rate
router.post("/tax-rate", isAuthenticatedUser, addTaxRate);
router.post("/edit-tax-rate", isAuthenticatedUser, editTaxRate);
router.post("/tax-rates", isAuthenticatedUser, getAllTaxRates);
router.post("/delete-tax-rate", isAuthenticatedUser, deleteTaxRate);

// DeliveryZone
router.post("/delivery-zone", isAuthenticatedUser, addDeliveryZone);
router.post("/edit-delivery-zone", isAuthenticatedUser, editDeliveryZone);
router.post("/delivery-zones", isAuthenticatedUser, viewDeliveryZones);
router.post("/delete-delivery-zones", isAuthenticatedUser, deleteDeliveryZone);

// location
router.get("/countries", isAuthenticatedUser, getAllCountries);
router.post("/states", isAuthenticatedUser, validateRequest(restaurantValidation.countryStateSchema), getStatesByCountryId);
router.post("/cities", isAuthenticatedUser, validateRequest(restaurantValidation.countryStateSchema), getCitiesByStateAndCountry);

// Cuisine API
router.post("/cuisine", isAuthenticatedUser, multerUploadFile.single('cuisine_image'), validateRequest(cuisineValidation.addCuisineSchema), addCuisine);
router.post("/edit-cuisine", isAuthenticatedUser, multerUploadFile.single('cuisine_image'), validateRequest(cuisineValidation.editCuisineSchema), editCuisine);
router.post("/cuisines", isAuthenticatedUser, validateRequest(restaurantValidation.restaurantIdSchema), fetchCuisines);
router.post("/delete-cuisine", isAuthenticatedUser, validateRequest(restaurantValidation.findByIdSchema), deleteCuisine);

// Default Cuisine API
router.post("/default-cuisine", isAuthenticatedUser, multerUploadFile.single('cuisine_image'), validateRequest(cuisineValidation.manageDefaultCuisineSchema), manageDefaultCuisine);
router.post("/default-cuisines", isAuthenticatedUser, validateRequest(restaurantValidation.restaurantIdSchema), fetchDefaultCuisine);

router.route("/restaurants/verifyDomain").post(isAuthenticatedUser, verifyDomain);

router.post("/update", isAuthenticatedUser, handleDocument);
router.post("/getDocumentById", isAuthenticatedUser, getDocumentById);

router.post("/pause-services", isAuthenticatedUser, managePauseServices);
router.post("/pause-services-data", isAuthenticatedUser, getPauseServices);
router.post("/delete-pause-services", isAuthenticatedUser, deletePauseServices);

// Public API Calls 
router.post("/getRestaurant", getRestaurantById);
router.post("/web-key", getRestaurantStripe);
router.post("/privacy-and-terms", fetchPrivacyAndTerms);

export default router;