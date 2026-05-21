const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Initialize OpenRouter client using OpenAI SDK
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post("/generate-blog", async (req, res) => {
  try {
    const { topic, tone } = req.body;
    const prompt = `Write a blog post about "${topic}" in a ${tone} tone. 
                    Include a title, introduction, 3 main points, and conclusion.
                    Keep it under 50 words.`;

    const completion = await openrouter.chat.completions.create({
      model: "google/gemini-2.0-flash-lite-001",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      success: true,
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
