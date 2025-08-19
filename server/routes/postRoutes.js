import express from "express";
import Post from "../mongodb/models/post.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt, imageUrl, userId } = req.body;
    const post = await Post.create({ prompt, imageUrl, createdBy: userId });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts (for Gallery)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
