import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, // Link to Shop
    name: { type: String, required: true }, // Example: "Milk", "Shampoo", "Laptop"
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 }, // How many products are available
    category: { type: String }, // Example: "Dairy", "Electronics", "Groceries"
    image: { type: String }, // URL to product image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
