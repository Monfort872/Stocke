import express from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/ProductController.js";

const router = express.Router();

// All product routes are protected by the auth middleware, so only authenticated users can access them
router.use(authMiddleware);
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;