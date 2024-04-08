import express from "express";
import {
  createContact,
  deleteContact,
  updateContact,
  getSingleContact,
  getContacts,
} from "../controller/Footer.js";

import {
  isAuthenticatedUser,
  authorizeRoles,
  adminMiddleware,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.post(
  "/contact/new",
  isAuthenticatedUser,
  adminMiddleware,
  createContact
);
router.get("/contact/all", getContacts);

router
  .route("/contact/:id")
  .put(isAuthenticatedUser, adminMiddleware, updateContact)
  .delete(isAuthenticatedUser, adminMiddleware, deleteContact)
  .get(getSingleContact);


export default router;
