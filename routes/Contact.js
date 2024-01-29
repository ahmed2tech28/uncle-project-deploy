import express from "express";
import {
  createContact,
  deleteContact,
  updateContact,
  getSingleContact,
  getContacts,
} from "../controller/Contact.js";

import {
  isAuthenticatedUser,
  adminMiddleware,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, createContact);

router.get("/all", getContacts);
router
  .route("/:id")
  .get(getSingleContact)
  .put(isAuthenticatedUser, adminMiddleware, updateContact)
  .delete(isAuthenticatedUser, adminMiddleware, deleteContact);

export default router;
