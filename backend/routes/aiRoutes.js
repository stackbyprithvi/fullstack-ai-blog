const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL = "google/gemini-2.5-flash";

const VALID_TONES = [
  "professional",
  "casual",
  "humorous",
  "educational",
  "inspirational",
];

router.post("/generate-blog", async (req, res) => {
  const { topic, tone = "professional" } = req.body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ success: false, error: "Topic is required" });
  }

  if (!VALID_TONES.includes(tone)) {
    return res.status(400).json({
      success: false,
      error: `Tone must be one of: ${VALID_TONES.join(", ")}`,
    });
  }

  const prompt = `Write a blog post about "${topic.trim()}" in a ${tone} tone.

Structure it exactly like this:
# [Title]

## Introduction
[2-3 sentences]

## [Main Point 1]
[2-3 sentences]

## [Main Point 2]
[2-3 sentences]

## [Main Point 3]
[2-3 sentences]

## Conclusion
[2-3 sentences]

Keep it concise but complete. Use markdown formatting.`;

  //  SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openrouter.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: true, //  streaming on
      max_tokens: 800,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("AI generate error:", error);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: "Generation failed" })}\n\n`);
      return res.end();
    }
    res
      .status(500)
      .json({ success: false, error: "Failed to generate blog post." });
  }
});

module.exports = router;
