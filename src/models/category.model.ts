import { model, Schema, type Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  parentId: Schema.Types.ObjectId | null;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  }
}, { timestamps: true });

export const Category = model<ICategory>("Category", categorySchema);
