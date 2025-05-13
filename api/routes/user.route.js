import express from "express";
import {
  deleteUser,
  getUserListings,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.get("/listings/:id", verifyUserToken, getUserListings);

export default router;
