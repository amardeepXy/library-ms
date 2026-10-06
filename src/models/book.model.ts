import mongoose, { Model, Schema, type Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IBook extends Document {
    title: string;
    description: string;
    isbn: string;
    author: Schema.Types.ObjectId;
    categories: Schema.Types.ObjectId[];
    publisher: Schema.Types.ObjectId;
    publishedAt: Schema.Types.Date;
    language: string;
    edition: number;
    createdAt: Schema.Types.Date;
    updatedAt: Schema.Types.Date;
}

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Author",
            required: true
        },
        categories: {
            type: [{type: Schema.Types.ObjectId, ref: "Category"}]
        },
        publisher: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        publishedAt: {
            type: Schema.Types.Date,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        edition: {
            type: Number,
            required: true
        }
    }, {timestamps: true}
);

export const Book = mongoose.model<IBook>("User", bookSchema);