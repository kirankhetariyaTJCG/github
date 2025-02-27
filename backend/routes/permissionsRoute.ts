import express from 'express';
import { addPermissions, assignPermissions, fetchPermissions } from '@Controllers/permissionsController';

const router = express.Router();


router.get("/addPermissions", addPermissions);
router.get("/fetchPermissions", fetchPermissions);
router.post("/assignPermissions", assignPermissions);


export default router;