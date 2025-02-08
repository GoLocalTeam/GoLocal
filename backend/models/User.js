import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "shopkeeper"], default: "user" },
    profilePicture: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    location: {
        address: { type: String }, // Store user’s address (optional)
        coordinates: { type: [Number], index: "2dsphere" }, // [longitude, latitude]
      },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);