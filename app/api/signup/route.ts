import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json(); // ✅ username

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return  NextResponse.json("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   return NextResponse.json({ message: "Signup successful" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return  NextResponse.json("Signup error", { status: 500 });
  }
}
