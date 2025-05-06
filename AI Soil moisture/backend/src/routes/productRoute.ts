import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController";
import { authentication } from "../middlewares/authentication";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// Public routes
router.route("/").get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProductById);

// Protected routes
router.route("/").post(authentication, isAdmin, createProduct);
router.route("/:id").put(authentication, isAdmin, updateProduct);
router.route("/:id").delete(authentication, isAdmin, deleteProduct);
router.route("/:id/reviews").post(authentication, createProductReview);

export default router;
