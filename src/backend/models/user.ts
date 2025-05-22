import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
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
    },
    {
        timestamps: true
    })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);