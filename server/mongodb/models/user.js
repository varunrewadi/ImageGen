import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model("User", userSchema);
