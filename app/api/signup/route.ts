import { connectToDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return new Response("User registered successfully", { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return new Response("Failed to register user", { status: 500 });
  }
}
