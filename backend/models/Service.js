import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, // Reference to Shop
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: String }, // e.g., "30 mins", "1 hour"
    availability: { type: Boolean, default: true }, // Service availability status
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
