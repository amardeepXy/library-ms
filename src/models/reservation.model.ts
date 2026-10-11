
// id string pk
//   bookId string fk
//   memberId string fk
//   reservedAt Date => createdAt
//   expiresAt Date
//   status string
//   // WAITING|READY|FULFILLED|CANCELLED|EXPIRED

import { model, Schema, type Document } from "mongoose";
import { appConfig } from "../configs/app.config";

export interface IReservation extends Document {
  bookId: Schema.Types.ObjectId;
  memberId: Schema.Types.ObjectId;
  expiresAt: Date;
  status: "WAITING" | "READY" | "FULFILLED" | "CANCELLED" | "EXPIRED";
  reservedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + appConfig.bookReservationExpiry),
    },
    status: {
      type: String,
      enum: ["WAITING", "READY", "FULFILLED", "CANCELLED", "EXPIRED"],
      default: "WAITING",
    },
    reservedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "reservedAt",
      updatedAt: false,
    },
  }
);

export const Reservation = model<IReservation>("Reservation", reservationSchema);
