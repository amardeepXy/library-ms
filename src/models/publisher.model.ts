import {model, Schema, type Document} from "mongoose";

export interface IPublisher extends Document{
    name: string;
    address: string;
    website: string;
}

const publisherSchema = new Schema<IPublisher>({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }

}, {timestamps: true});

export const Publisher = model<IPublisher>("Publisher", publisherSchema);