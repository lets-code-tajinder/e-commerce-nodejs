import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import cartRoutes from "./router/cartRoutes";
import contactUsRoutes from "./router/contactUsRoutes";
import categoryRoutes from "./router/categoryRoutes";
import productRoutes from "./router/productRoutes";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/enest")
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
