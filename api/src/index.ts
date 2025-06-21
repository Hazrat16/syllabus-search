// api/src/index.ts
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const COHERE_API_KEY = process.env.COHERE_API_KEY;

app.post("/api/overview", async (req, res) => {
  const { course } = req.body;

  if (!course) {
    res.status(400).json({ error: "Course name is required" });
    return;
  }

  console.log("Cohere API Key:", JSON.stringify(COHERE_API_KEY));

  try {
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command",
        prompt: `Write a 250-300 word academic course overview for: ${course}`,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.text;
    if (!text || text.trim().length === 0) {
      res.status(500).json({
        error: "No text was generated from Cohere",
        details: response.data,
      });
      return;
    }

    res.json({ overview: text.trim() });
  } catch (err: any) {
    res.status(500).json({
      error: "Failed to fetch from Cohere",
      details: err?.response?.data || err.message,
    });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
