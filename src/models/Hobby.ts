import mongoose, { Document, Schema } from 'mongoose';

export interface IHobby {
    name: string;
    passionLevel: string;
    year: string;
}

export interface IHobbyModel extends IHobby, Document {}

const HobbySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        passionLevel: { type: String, required: true },
        year: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IHobbyModel>('Hobbies', HobbySchema);
