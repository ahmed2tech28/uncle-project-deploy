import express from "express";
import {
  createFaqs,
  deleteFaqs,
  updateFaqs,
  getSingleFaqs,
  getPoultryFaqs,
  getPinkSaltFaqs,
  getFaqs,
} from "../controller/FAQs.js";

import {
  isAuthenticatedUser,
  adminMiddleware,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, adminMiddleware, createFaqs);
router
  .route("/:id")
  .put(isAuthenticatedUser, adminMiddleware, updateFaqs)
  .delete(isAuthenticatedUser, adminMiddleware, deleteFaqs);

router.get("/all", getFaqs);
router.get("/allpoultry", getPoultryFaqs);
router.get("/allpinkSalt", getPinkSaltFaqs);
router.get("/:id", getSingleFaqs);
router.route("/:id").get(getSingleFaqs).put(updateFaqs).delete(deleteFaqs);

export default router;
