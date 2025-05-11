import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyUserToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyUserToken, createListing)

export default router;