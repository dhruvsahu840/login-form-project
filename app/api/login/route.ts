				
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("🔐 Email:", email, "Password:", password);

    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "Invalid email" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("❌ Incorrect password");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    console.log("✅ Login successful");

    // ✅ Send back full user data
    return NextResponse.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    return NextResponse.json({ error: "Login error" }, { status: 500 });
  }
}

