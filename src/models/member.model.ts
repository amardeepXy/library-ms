import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {model, Schema, type Document} from "mongoose";
import { envConfig } from "../configs/env.config";
import { appConfig } from "../configs/app.config";

//  id string pk
//   name string
//   email UNIQUE
//   phone number
//   password string
//   address string
//   joinedAt Date
//   status string
//   // ACTIVE|SUSPENDED|EXPIRED
export interface IMember extends Document{
    name: string;
    email: string;
    phone: number;
    password: string;
    address: string;
    profilePic: {
        publicId: string,
        url: string
    };
    joinedAt: Date;
    status: "ACTIVE" | "SUSPENDED" | "EXPIRED"
}

const memberSchema = new Schema<IMember>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    phone: {
        type: Number,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "SUSPENDED", "EXPIRED"],
        required: true,
        default: "ACTIVE"
    },
    profilePic:{
        publicId: String,
        url: String     
    }
}, {
    timestamps: {
        createdAt: "joinedAt",
        updatedAt: true
    }
});

memberSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

memberSchema.methods.isCorrectPassword = async function(plainPassword: string){
    if(!plainPassword || !this.password){
        if(!this.password){
            console.error("No password selected in member query");
        }
        return false;
    }
    return await bcrypt.compare(plainPassword, this.password);
}

memberSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, envConfig.memberAccessTokenSecret, {expiresIn: appConfig.memberAccessTokenExpiry});
}

export const Member = model<IMember>("Member", memberSchema);