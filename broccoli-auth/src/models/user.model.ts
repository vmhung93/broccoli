import { Schema, model } from "mongoose";

// Create an interface representing a document in MongoDB
interface IUser {
    username: string;
    email: string;
    passwordHash: string;
}

// Create a Schema corresponding to the document interface
const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

// Create a Model.
const User = model<IUser>("User", userSchema);

export default User;
