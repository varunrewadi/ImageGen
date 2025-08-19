import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://router.huggingface.co/nebius/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: "stability-ai/sdxl",
          response_format: "b64_json", // <-- Hugging Face returns JSON here
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    // Parse JSON response properly
    const result = await response.json();

    // Hugging Face returns { data: [ { b64_json: "..." } ] }
    const imageBase64 = result.data[0].b64_json;

    res.json({ image: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;
