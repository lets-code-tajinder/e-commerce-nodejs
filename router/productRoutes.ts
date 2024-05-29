import express from "express";
import {
  getProductById,
  getProductData,
  getProducts,
  getProductsByCategoryId,
  searchProducts,
} from "../controllers/productController";

const router = express.Router();

router.get("/products", getProducts);
router.get("/productData", getProductData);
router.post("/productById", getProductById);
router.post("/productsByCategory", getProductsByCategoryId);
router.post("/searchProducts", searchProducts);

export default router;
