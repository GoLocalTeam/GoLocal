import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // "Salon", "Grocery Store", "Electronics"
    contact: { type: String, required: true },

    type: { 
      type: String, 
      enum: ["service", "product", "both"], 
      required: true 
    }, // Defines if it's a service-based or product-based shop

    location: {
      address: { type: String, required: true },
      coordinates: { type: [Number], index: "2dsphere", required: true }, // [longitude, latitude]
    },

    workingHours: {
      weekdays: { open: String, close: String },
      weekends: { open: String, close: String },
    },

    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;