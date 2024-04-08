import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  verifyUser,
} from "../controller/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.put("/verifybyemail/:code", verifyEmail);
router.post("/auth", loginUser);
router.post("/verify", verifyUser);

export default router;
