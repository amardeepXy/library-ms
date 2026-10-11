import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model, Schema, type Document } from "mongoose";
import { envConfig } from "../configs/env.config";
import { appConfig } from "../configs/app.config";

// libraryStaff[icon: library ]{
//   id string pk
//   name string
//   email string
//   password string
//   role string
//   // staff|admin
// }

export interface ILibraryStaff extends Document {
  name: string;
  email: string;
  password: string;
  role: "staff" | "admin";
}

const libraryStaffSchema = new Schema<ILibraryStaff>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requried: true
  },
  role: {
    type: String,
    enum: ["staff", "admin"]
  }
}, { timestamps: true });
;
libraryStaffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

libraryStaffSchema.methods.isCorrectPassword = async function (plainPassword: string) {
  if (!plainPassword || !this.password) {
    if (!this.password) {
      console.error("no password selected in the libraryStaff query");
    }
    return false
  }
  return await bcrypt.compare(plainPassword, this.password);
}

libraryStaffSchema.methods.generateAccessToken = async function () {
  return jwt.sign({
    _id: this._id,
    email: this.email
  }, envConfig.staffAccessTokenSecret, { expiresIn: appConfig.staffAccessTokenExpiry });
}

export const LibraryStaff = model<ILibraryStaff>("LibraryStaff", libraryStaffSchema);
