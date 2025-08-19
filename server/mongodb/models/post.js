import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
