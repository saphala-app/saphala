import { connectToDB } from "@/backend/db";
import { User } from "@/backend/models/user";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        connectToDB()

        const user = await User.find({});

        return NextResponse.json(new ApiResponse(user, "Fetched all users"));
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(new ApiError(500, "An error", error.message));
        }

        return NextResponse.json(new ApiError(500, "An error", error));
    }
}