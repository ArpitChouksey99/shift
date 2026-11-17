import mongoose from "mongoose";

const demoRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    business: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    teamSize: { type: String, required: true, enum: ["1-8", "9-30", "31+"] },
    message: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("DemoRequest", demoRequestSchema);
