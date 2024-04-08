import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  getProducts,
  latestProducts,
  relatedProducts,
  toprated,
} from "../controller/Product.js";

import {
  isAuthenticatedUser,
  adminMiddleware,
} from "../middleware/common-middleware.js";

const router = express.Router();

router.route("/").get(getAllProducts);

router
  .route("/admin/new")
  .post(isAuthenticatedUser, adminMiddleware, createProduct);

router
  .route("/admin/:id")
  .put(isAuthenticatedUser, adminMiddleware, updateProduct)
  .delete(isAuthenticatedUser, adminMiddleware, deleteProduct);

router.route("/pro/:id").get(getProductDetails);

router.route("/review").post(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);
router.route("/latest").get(latestProducts);
router.route("/toprated").get(toprated);
router.route("/related/:id").get(relatedProducts);

router.route("/getprod").post(getProducts);

export default router;
