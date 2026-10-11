import { model, Schema, type Document } from "mongoose";

// finePayments[icon: rupee]{
//   id string pk
//   fineId string fk
//   paidBy string fk
//   amount number
//   paidAt Date => createdAt
//   paymentMethod string
//   transactionReference string
// }

export interface IFinePayment extends Document {
  fineId: Schema.Types.ObjectId;
  paidBy: Schema.Types.ObjectId;
  amount: number;
  paidAt: Date; // => createdAt
  paymentMethod: string;
  transactionReference: string;
}

const finePaymentSchema = new Schema<IFinePayment>({
  fineId: {
    type: Schema.Types.ObjectId,
    ref: "Fine",
    required: true
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["UPI", "CARD", "GOOGLEPAY", "APPLEPAY", "WALLET"],
    required: true,
    default: "WALLET"
  },
  transactionReference: {
    type: String,
    required: true
  }
}, { timestamps: {
  createdAt: "paidAt",
  updatedAt: true
} });

export const FinePayment = model<IFinePayment>("FinePayment", finePaymentSchema);
