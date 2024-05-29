import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  title: string;
  id: number;
  categoryName: string;
}

const CategorySchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  categoryName: { type: String, required: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
