import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  price: number;
  description: string;
  special: boolean;
  id: number;
  categoryId: number;
}

const ProductSchema: Schema = new Schema({
  categoryId: { type: Number, required: true },
  id: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  special: { type: Boolean, default: false },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
