import { Router } from "express";
import {
  createProduct,
  deletProduct,
  getProductByID,
  getProducts,
  updateProduct,
} from "../controllers/productsController.js";
import { admin, verifyToken } from "../middleware/authMiddleware.js";
const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(verifyToken, admin, createProduct);

productRouter
  .route("/:id")
  .get(getProductByID)
  .delete(verifyToken, admin, deletProduct)
  .put(verifyToken, admin, updateProduct);

export default productRouter;
