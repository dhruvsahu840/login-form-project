import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (userId) {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }
      return NextResponse.json(user);
    } else {
      const users = await User.find().select("-password");
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("GET /api/user error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
