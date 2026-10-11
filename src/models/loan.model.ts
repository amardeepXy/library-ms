
// loans[icon: arrow-big-right ]{
//   id string pk
//   memberId string fk
//   bookCopyId string fk
//   borrowedAt Date => createdAt
//   dueAt Date
//   returnedAt NULL|Date
//   renewalCount number
//   status 
// }

import { type Document, model, Schema } from "mongoose";

export interface ILoan extends Document {
  memberId: Schema.Types.ObjectId;
  bookCopyId: Schema.Types.ObjectId;
  dueAt: Date;
  returnedAt: Date;
  renewalCount: number;
  status: "RETURNED" | "ACTIVE" | "LOST";
}

const loanSchema = new Schema<ILoan>({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  bookCopyId: {
    type: Schema.Types.ObjectId,
    ref: "BookCopy",
    required: true
  },
  dueAt: {
    type: Schema.Types.Date,
    required: true
  },
  returnedAt: {
    type: Date,
    required: true
  },
  renewalCount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["RETURNED", "ACTIVE", "LOST"],
    default: "ACTIVE"
  }
}, { timestamps: {
  createdAt: "borrowedAt",
  updatedAt: true
} })

export const Loan = model<ILoan>("Loan", loanSchema);
