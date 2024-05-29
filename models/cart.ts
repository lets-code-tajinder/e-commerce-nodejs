import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
  userId: string;
  productId: number;
  qty: number;
}

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Number, required: true },
  qty: { type: Number, required: true },
});

export default mongoose.model<ICart>("Cart", CartSchema);
