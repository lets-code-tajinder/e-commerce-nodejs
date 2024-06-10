import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./router/userRouter";
import cartRoutes from "./router/cartRoutes";
import contactUsRoutes from "./router/contactUsRoutes";
import categoryRoutes from "./router/categoryRoutes";
import productRoutes from "./router/productRoutes";
import config from "./configs";

dotenv.config();

const app = express();
const port = config.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(String(config.MONGODB_URI))
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api", userRouter);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api", contactUsRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
