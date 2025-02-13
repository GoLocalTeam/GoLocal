import Shop  from "../models/Shop.js";
import dotenv from "dotenv";
dotenv.config(); //to load the jwt token = golocal in this file

//Create a new shop
export const createShop = async (req, res) => {
    try {
        //get the data from the request body
        const {owner, name, description, category, contact, type, location, workingHours, status} = req.body;


        if(req.user.id !== owner){
            return res.status(403).json({ message: "You are not authorized to create a shop for another user" });
        }

        //data validation
        if (!owner || !name || !description || !category || !contact || !type || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if the shop already exists
        const shopExists = await Shop.findOne({
            $or: [
                { owner: req.user.id }, // Check if user already has a shop
                { name: req.body.shopName }, // Check if shop name is taken
                { location: req.body.address } // Check if a shop exists at the same location
            ]
        });
        if (shopExists) {
            return res.status(400).json({ message: "Shop already exists" });
        }

        //create a new shop
        const shop = await Shop.create({
            owner: req.user.id, name, description, category, contact, type, location, workingHours, status
        });

        //send the response
        return res.status(201).json({
            success: true,
            message: 'Shop created successfully',
            data: shop,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}  


//Update a shop
export const updateShop = async (req, res) => {
    try {
        //get the data from the request body
        const {name, description, category, contact, type, location, workingHours, status} = req.body;

        const shopU = await Shop.findById(req.params.shopId);

        if(req.body.owner !== shopU.owner.toString()){
            return res.status(403).json({ message: "You are not authorized to update a shop for another user" });
        }

        //data validation
        if (!name || !description || !category || !contact || !type || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if the shop exists
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        //check if the user is the owner of the shop
        if (shop.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this shop" });
        }

        //update the shop
        await Shop.findByIdAndUpdate(req.params.shopId, {
            name, description, category, contact, type, location, workingHours, status
        });

        //send the response
        return res.status(200).json({
            success: true,
            message: 'Shop updated successfully',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Delete a shop
export const deleteShop = async (req, res) => {
    try {
        //check if the shop exists
        const shop = await Shop.findById(req.params.shopId);    
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        //check if the user is the owner of the shop
        if (shop.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this shop" });
        }

        //delete the shop
        await Shop.findByIdAndDelete(req.params.shopId);

        //send the response
        return res.status(200).json({
            success: true,
            message: 'Shop deleted successfully',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

//Get all shops
export const getShops = async (req, res) => {
    try {
        //get all shops
        const shops = await Shop.find();
        return res.status(200).json({
            success: true,
            data: shops,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Get a shop by id
export const getShopById = async (req, res) => {
    try {
        //check if the shop exists
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        //send the response
        return res.status(200).json({
            success: true,
            data: shop,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error from getShopById" });
    }
}