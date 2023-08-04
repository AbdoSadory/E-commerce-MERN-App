import { Router } from "express";
import {
  addReviewProduct,
  createProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productsController.js";
import { admin, verifyToken } from "../middleware/authMiddleware.js";
const productRouter = Router();

productRouter.route("/top-products").get(getTopProducts);
productRouter
  .route("/")
  .get(getProducts)
  .post(verifyToken, admin, createProduct);

productRouter
  .route("/:id")
  .get(getProductByID)
  .delete(verifyToken, admin, deleteProduct)
  .put(verifyToken, admin, updateProduct);

productRouter.route("/:id/review").post(verifyToken, addReviewProduct);
export default productRouter;
