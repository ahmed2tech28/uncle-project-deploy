import express from "express";
import {
  createSocialIcons,
  deleteSocialIcons,
  updateSocialIcons,
  getSingleSocialIcons,
  getSocialIcons,
} from "../controller/SocialIcons.js";

import {
  isAuthenticatedUser,
  adminMiddleware,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, adminMiddleware, createSocialIcons);
router
  .route("/links/:id")
  .put(isAuthenticatedUser, adminMiddleware, updateSocialIcons)
  .delete(isAuthenticatedUser, adminMiddleware, deleteSocialIcons);
router.route("/links/:id").get(getSingleSocialIcons);
router.get("/all", getSocialIcons);

export default router;
