import { model, Schema, type Document } from "mongoose";

export interface IFine extends Document {
  loanId: Schema.Types.ObjectId;
  memberId: Schema.Types.ObjectId;
  amount: number;
  reason: string;
  issuedAt: Schema.Types.Date;
  paidAt: Schema.Types.Date | null;
  status: "UNPAID " | "PARTIALLY_PAID " | "PAID" | "WAIVED";
}

const fineSchema = new Schema<IFine>({
  loanId: {
    type: Schema.Types.ObjectId,
    ref: "Loan",
    required: true,
    unique: true
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  paidAt: {
    type: Date,
    default: null
  },
  issuedAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["UNPAID", "PARTIALLY_PAID", "PAID", "WAIVED"]
  }
}, {
  timestamps: {

  }
});

export const Fine = model<IFine>("Fine", fineSchema);
