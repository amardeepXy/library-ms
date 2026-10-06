import mongoose, {Schema, type Document} from "mongoose";

export interface IBookCopy extends Document{
    bookId: Schema.Types.ObjectId;
    accessionNumber: string;
    status: "AVAILABLE"|"LOST"|"BORROWED"|"DAMAGED"|"MAINTENANCE";
}

const bookCopySchema = new Schema<IBookCopy>({
    bookId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    accessionNumber: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ["AVAILABLE","LOST","BORROWED","DAMAGED","MAINTENANCE"],
        required: true,
        default: "AVAILABLE"
    }
}, {timestamps: true});

export const BookCopy = mongoose.model<IBookCopy>("BookCopy", bookCopySchema);