import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 1️⃣ Connect to MongoDB
    await connectToDB();

    // 2️⃣ Parse the request URL to get query parameters
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    // 3️⃣ If ID is present, find specific user
    if (userId) {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }
      return NextResponse.json(user);
    }

    // 4️⃣ If no ID, return all users
    const users = await User.find().select("-password");
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
