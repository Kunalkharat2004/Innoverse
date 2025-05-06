import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController";
import { authentication } from "../middlewares/authentication";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// Protected routes
router.route("/").post(authentication, createOrder);
router.route("/").get(authentication, isAdmin, getOrders);
router.route("/myorders").get(authentication, getMyOrders);
router.route("/:id").get(authentication, getOrderById);
router.route("/:id/pay").put(authentication, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(authentication, isAdmin, updateOrderToDelivered);

export default router;
