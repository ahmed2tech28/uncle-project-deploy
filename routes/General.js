import express from "express";
import { sendingMail } from "../controller/General.js";
import { isAuthenticatedUser } from "../middleware/common-middleware.js";

const router = express.Router();

router.post(
  "/response",
  isAuthenticatedUser,
  sendingMail
);

export default router;
