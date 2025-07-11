import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("📩 Email:", email);
    console.log("🔐 Password:", password);

    await connectToDB();
    console.log("✅ MongoDB Connected");

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB");
      return new NextResponse("User not found", { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password");
      return new NextResponse("Invalid password", { status: 401 });
    }

    console.log("✅ Login Successful");
    return new NextResponse("Login successful", { status: 200 });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    return new NextResponse("Login error", { status: 500 });
  }
}
