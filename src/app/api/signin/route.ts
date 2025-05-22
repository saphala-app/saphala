import { connectToDB } from "@/backend/db";
import { User } from "@/backend/models/user";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { AUTH_FAILED, AUTH_PASS_FAIL } from "@/lib/constants";
import { isPasswordCorrect } from "@/lib/helper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    connectToDB()

    const body = await request.json();

    try {

        const { email, password } = body;

        if ([email, password].some((field: string) => field.trim() == "")) {
            return NextResponse.json(new ApiError(400, "Invalid data"))
        }

        const userExists = await User.findOne({
            email,
        });

        if (!userExists) {
            return NextResponse.json(new ApiError(401, AUTH_FAILED), { status: 401 })
        }

        if (!isPasswordCorrect(password, userExists.password)) {
            return NextResponse.json(new ApiError(401, AUTH_PASS_FAIL), { status: 401 })
        }

        const user = {
            _id: userExists._id,
            username: userExists.username,
            avatar: userExists.avatar,
        }

        return NextResponse.json(new ApiResponse(user, "Logged in successfully!"));
    } catch (error: any) {
        return NextResponse.json(new ApiError(500, "An Occurred while logging you in", error.message), { status: 500 })
    }

}