import mongoose from "mongoose";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Shop from "../models/Shop.js";

export const searchItems = async (req, res) => {
    try {
        let { keyword, longitude, latitude } = req.query;

        if (!longitude || !latitude || !keyword) {
            return res.status(400).json({ message: "Keyword, longitude, and latitude are required" });
        }

        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude);

        console.log("Searching for:", keyword);

        // Convert keyword into regex for multi-word search
        const words = keyword.trim().split(/\s+/);
        const regexPattern = words.map(word => `(?=.*${word})`).join(""); 
        const searchRegex = new RegExp(regexPattern, "i");

        // Search for matching products, services, and shops
        const searchQuery = { 
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { category: searchRegex }
            ]
        };

        const products = await Product.find(searchQuery).populate("shop");
        const services = await Service.find(searchQuery).populate("shop");
        const shops = await Shop.find(searchQuery);

        console.log("Products found:", products.length);
        console.log("Services found:", services.length);
        console.log("Shops found:", shops.length);

        // Collect all matching shop IDs
        const shopIds = new Set([
            ...products.map(p => p.shop?._id?.toString()),
            ...services.map(s => s.shop?._id?.toString()),
            ...shops.map(s => s._id?.toString())
        ].filter(Boolean));

        // Fetch shop locations sorted by distance
        const nearbyShops = await Shop.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] },
                    distanceField: "distance",
                    spherical: true
                }
            },
            { $match: { _id: { $in: Array.from(shopIds).map(id => new mongoose.Types.ObjectId(id)) } } }
        ]);

        // Create a distance map for shops
        const shopDistanceMap = Object.fromEntries(
            nearbyShops.map(shop => [shop._id.toString(), shop.distance])
        );

        // Add distance to results and sort them
        let results = [...products, ...services, ...shops].map(item => {
            const shopId = item.shop?._id?.toString() || item._id.toString();
            return { ...item.toObject(), distance: shopDistanceMap[shopId] || Infinity };
        });

        results.sort((a, b) => a.distance - b.distance);

        if (!results.length) {
            return res.status(404).json({ message: "No results found" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
