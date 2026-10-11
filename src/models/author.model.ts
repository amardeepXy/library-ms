import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  profilePic: string;
  bio: string;
}

const authorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  profilePic: {
    type: String,
  }
}, { timestamps: true });

export const Author = mongoose.model<IAuthor>("Author", authorSchema);