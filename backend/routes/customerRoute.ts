import express from 'express';
import { customerList, deleteCustomer, getCustomerById, loginCustomer, logout, manageCustomer, registerCustomer, setCustomer, updateCustomerProfile } from '@Controllers/customerController';
import { isAuthenticatedUser, isAuthenticatedCus } from '@Middleware/auth';

const router = express.Router();

router.post("/registerCustomer", registerCustomer);
router.post("/loginCustomer", loginCustomer);
router.post("/logout", isAuthenticatedCus, logout);
router.post("/getCustomerById", isAuthenticatedCus, getCustomerById);
router.post("/updateCustomerProfile", isAuthenticatedCus, updateCustomerProfile);
router.post("/deleteCustomer", isAuthenticatedCus, deleteCustomer);

router.post("/customer", manageCustomer);
router.post("/customer/data", isAuthenticatedUser, customerList);

router.post("/set-customer", setCustomer);

export default router;