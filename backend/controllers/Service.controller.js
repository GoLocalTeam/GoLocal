import Service  from "../models/Service.js";
import dotenv from "dotenv";
dotenv.config();

// Create a new product
export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, availability } = req.body;
    const { shopId } = req.params;
    const service = new Service({
      shop: shopId,
      name,
      description,
      price,
      duration,
      availability
    });
    await service.save();
    res.status(201).json({
      success: true,
      message: "Service listed successfully",
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from create Service",
      error: error
    });
  }
};

// Update a product
export const updateService = async (req, res) => {
  try {
    const { name, description, price, duration, availability } = req.body;
    const service = await Service.findOneAndUpdate(
      { _id: req.params.serviceId },
      { name, description, price, duration, availability },
      { new: true }
    );
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a product
export const deleteService = async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.serviceId });
    res.status(200).json({ message: "Service has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all products
export const getServices = async (req, res) => {
    try {
        console.log("UPAR");
        const services = await Service.find();
        
        console.log("NICHHE");
        if (!services.length) {
            return res.status(404).json({ message: "No products found for this user" });
        }
  
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Get a product by id
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    res.status(200).json(service);
    }
    catch (error) {
    res.status(500).json({ error: error });
    }
};

// Get all products by shop
export const getServicesByShop = async (req, res) => {
    try {
      const { shopId } = req.params;
      const service = await Service.find({ shop: shopId });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};
