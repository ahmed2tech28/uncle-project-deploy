import express from "express";
import {
  createHappyClients,
  getHappyClients,
  getSingleHappyClients,
  deleteHappyClients,
} from "../controller/HappyClients.js";
import {
  adminMiddleware,
  isAuthenticatedUser,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticatedUser,
  adminMiddleware,
  createHappyClients
);
router.get("/all", getHappyClients);
router
  .route("/:id")
  .get(getSingleHappyClients)
  .delete(isAuthenticatedUser, adminMiddleware, deleteHappyClients);

export default router;
