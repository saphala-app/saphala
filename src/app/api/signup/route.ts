import { connectToDB } from "@/backend/db";
import { User } from "@/backend/models/user";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { USER_EXISTS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    connectToDB()

    const body = await request.json();

    try {

        const { email, password, user_name, full_name } = body;

        if ([user_name, full_name, email, password].some((field: string) => field.trim() == "")) {
            return NextResponse.json(new ApiError(400, "Invalid data"))
        }

        const userExists = await User.findOne({
            email,
        });

        if (userExists) {
            return NextResponse.json(new ApiError(401, USER_EXISTS), { status: 401 })
        }

        const user = await User.create({
            email,
            password,
            username: user_name,
            full_name,
        });      

        return NextResponse.json(new ApiResponse(user, "Account created!"));
    } catch (error: any) {
        console.log(error);

        return NextResponse.json(new ApiError(500, "An Occurred while creating an account", error.message), { status: 500 })
    }

}