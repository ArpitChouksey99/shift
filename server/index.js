import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import DemoRequest from "./models/DemoRequest.js";

const app = express();
const PORT = process.env.PORT || 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });

app.post("/api/demo-requests", limiter, async (req, res) => {
  const { name, email, business, teamSize, message = "" } = req.body || {};

  if (![name, email, business, teamSize].every((v) => typeof v === "string" && v.trim())) {
    return res.status(400).json({ message: "Name, email, business and team size are required." });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  try {
    const doc = await DemoRequest.create({ name, email, business, teamSize, message: String(message) });
    res.status(201).json({ message: "Demo request received.", id: doc._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: Object.values(err.errors)[0].message });
    }
    console.error(err);
    res.status(500).json({ message: "Could not save your request. Try again later." });
  }
});

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI. Copy .env.example to .env and set it.");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start:", err.message);
  process.exit(1);
});
