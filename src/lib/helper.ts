import { connectToDB } from "@/backend/db";
import { User } from "@/backend/models/user";
import { SignInType, SignUpType } from "@/types";
import bcrypt from "bcrypt"

// Connect to db
connectToDB()

/**
 * Helpers functions
 */
export function generateRandomPassword(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-='
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

export function isPasswordCorrect(password: string, hashPass: string) {
    return bcrypt.compareSync(password, hashPass);
}

export const loggedUser = async (credentials: SignInType) => {

    if (!credentials.password) {
        return null;
    }

    const userExists = await User.findOne({
        email: credentials.email,
    });


    if (!userExists || !isPasswordCorrect(credentials.password, userExists.password)) {
        return null;
    }

    const foundUser = await User.findById(userExists._id);

    if (!foundUser) {
        return null;
    }

    return {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        full_name: foundUser.full_name,
        avatar: foundUser.avatar,
    };
}

export const findOrCreate = async (credentials: SignUpType) => {
    const userExists = await User.findOne({
        email: credentials.email,
    });

    if (userExists) {
        return userExists;
    }

    const user = await User.create({
        email: credentials.email,
        password: credentials.password,
        username: credentials.user_name,
        full_name: credentials.full_name,
    });

    return user;
}