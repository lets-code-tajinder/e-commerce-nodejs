import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  categoryId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  displayOrder: string;
  status: string;
  productQuantity: number;
  special: boolean;
  id: number;
}

const ProductSchema: Schema = new Schema({
  categoryId: { type: Number, required: true },
  productName: { type: String, required: true, unique: true },
  productDescription: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImage: { type: String, required: true },
  displayOrder: { type: String },
  status: { type: String },
  productQuantity: { type: Number, required: true },
  id: { type: Number, required: true },
  special: { type: Boolean, default: false },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
