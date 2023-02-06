import mongoose, { Document, Schema } from 'mongoose';
import { IHobby } from './Hobby';

export interface IUser {
    name: String;
    hobbies: Schema.Types.ObjectId[];
}

export interface IPopulatedUser {
    name: String;
    hobbies: [IHobby];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobbies' }]
    },
    {
        timestamps: false,
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
