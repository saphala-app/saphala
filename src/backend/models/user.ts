import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "User Name is required!"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User Name is required!"],
    },
    password: {
        type: String,
        required: [true, "User Name is required!"],
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    }
})


export const User = mongoose.models.User || mongoose.model('User', userSchema);