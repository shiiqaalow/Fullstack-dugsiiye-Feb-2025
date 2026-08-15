import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    phone: string,
    isLoggedIn: boolean,
    lastLoggedIn: Date
}

const userSchema = new Schema<IUser> ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: String,
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isLoggedIn: Boolean,
    lastLoggedIn: Number
},{timestamps: true})

export const UserModel = mongoose.model<IUser>('User',userSchema)