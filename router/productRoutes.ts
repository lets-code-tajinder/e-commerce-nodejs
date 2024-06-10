import express from "express";
import {
  addProduct,
  getProductById,
  getProductData,
  getProducts,
  getProductsByCategoryId,
  searchProducts,
} from "../controllers/productController";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();

router.get("/products", getProducts);
router.get("/productData", getProductData);
router.post("/productById", getProductById);
router.post("/productsByCategory", getProductsByCategoryId);
router.post("/searchProducts", searchProducts);
router.post("/uploadImage", uploadImage);
router.post("/addProduct", addProduct);

export default router;
