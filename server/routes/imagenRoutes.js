import express from "express";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ⚠️ Example call – adjust based on Gemini’s image generation method
    const result = await genAI.generateImage({
      prompt,
      size: "512x512",
    });

    res.json({ imageUrl: result.data[0].url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
