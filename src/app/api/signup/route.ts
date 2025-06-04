import { connectToDB } from '@/backend/utils/db';
import { User } from '@/backend/models/user.model';
import { ApiError } from '@/lib/ApiError';
import { ApiResponse } from '@/lib/ApiResponse';
import { USER_EXISTS } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  connectToDB();

  const body = await request.json();

  try {
    const { email, password, user_name, full_name } = body;

    if ([user_name, full_name, email, password].some((field: string) => field.trim() == '')) {
      return NextResponse.json(new ApiError(400, 'Invalid data'), { status: 400 });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return NextResponse.json(new ApiError(409, USER_EXISTS), { status: 409 });
    }

    const user = await User.create({
      email,
      password,
      username: user_name,
      full_name,
    });

    const res = {
      _id: user._id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      avatar: user.avatar,
    };

    return NextResponse.json(new ApiResponse(res, 'Account created!'));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        new ApiError(500, 'An Occurred while creating an account', error.message),
        { status: 500 }
      );
    }

    return NextResponse.json(new ApiError(500, 'An Occurred while creating an account', error), {
      status: 500,
    });
  }
}
