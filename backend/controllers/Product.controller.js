import Product  from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config(); //to load the jwt token = golocal in this file

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { shop, name, description, price, stock, category, image } = req.body;
    const product = new Product({
      shop,
      name,
      description,
      price,
      stock,
      category,
      image,
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from createProduct",
      error: error
    });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { name, description, price, stock, category, image },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.productId });
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get a product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
    }
    catch (error) {
    res.status(500).json({ error: error });
    }
};

// Get all products by shop
export const getProductsByShop = async (req, res) => {
    try {
      const products = await Product.find({ shop: req.params.shopId });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};