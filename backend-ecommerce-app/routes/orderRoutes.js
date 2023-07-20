import { Router } from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrderByID,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, verifyToken } from "../middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.get("/myOrders", verifyToken, getUserOrders);
orderRouter.post("/", verifyToken, addOrderItems);
orderRouter.get("/:id", verifyToken, getOrderByID);
orderRouter.put("/:id/pay", verifyToken, updateOrderToPaid);
orderRouter.get("/admin/orders", verifyToken, admin, getAllOrders);
orderRouter.patch(
  "/admin/order/:id/delivery",
  verifyToken,
  admin,
  updateOrderToDelivered
);

export { orderRouter };
