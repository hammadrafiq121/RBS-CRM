import express from "express";
import {
  addCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
  uploadCustomers,
  // addCustomersFromCSV,
} from "../controller/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });
const customerRoutes = express.Router();

customerRoutes.post("/api/customers", protect, addCustomer);

customerRoutes.get("/api/customers", protect, getAllCustomers);
customerRoutes.get("/api/customers/:id", protect, getSingleCustomer);
customerRoutes.put("/api/customers/:id", protect, updateCustomer);
customerRoutes.delete("/api/customers/:id", protect, deleteCustomer);
customerRoutes.post(
  "/api/customers/upload",
  protect,
  roleMiddleware(["admin"]),
  upload.single("csvFile"),
  uploadCustomers
);

// customerRoutes.post("/api/customers/upload", addCustomersFromCSV);

export default customerRoutes;
