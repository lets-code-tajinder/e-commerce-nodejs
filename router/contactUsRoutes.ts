import express from "express";
import { addContactUsData } from "../controllers/contactUsController";

const router = express.Router();

router.post("/contactUs", addContactUsData);

export default router;
