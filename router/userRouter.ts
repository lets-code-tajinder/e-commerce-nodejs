import express from "express";
import { addUser, login } from "../controllers/userController";

const router = express.Router();

router.post("/signup", addUser);
router.post("/login", login);

export default router;
