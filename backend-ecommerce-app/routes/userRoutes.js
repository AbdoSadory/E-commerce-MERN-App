import { Router } from "express";
import {
  authUser,
  deletUser,
  getAllUsers,
  getUser,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/usersControllers.js";
import { admin, verifyToken } from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post("/login", authUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile", verifyToken, getUserProfile);
userRouter.post("/profile", verifyToken, updateUserProfile);
userRouter.get("/", verifyToken, admin, getAllUsers);
userRouter
  .get("/:id", verifyToken, admin, getUser)
  .post("/:id", verifyToken, admin, updateUser)
  .delete("/:id", verifyToken, admin, deletUser);

export default userRouter;
