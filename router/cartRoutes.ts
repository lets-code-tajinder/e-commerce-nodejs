import express from "express";
import { addToCart, getCartData } from "../controllers/cartController";

const router = express.Router();

router.post("/addToCart", addToCart);
router.post("/getCartData", getCartData);

export default router;
