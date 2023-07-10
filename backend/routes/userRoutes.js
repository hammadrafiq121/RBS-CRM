import express from "express";
import {
  loginUser,
  signupUser,
  getMe,
  getAllUsers,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/api/user/login", loginUser);
userRoutes.post("/api/user/signup", signupUser);
userRoutes.get("/api/user/me", protect, getMe);
userRoutes.get("/api/user/all", protect, getAllUsers);

export default userRoutes;
