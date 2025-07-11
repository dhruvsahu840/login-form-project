import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
