import express from "express";
import { createProduct, updateProduct, deleteProduct, getProductById, getProductsByShop, getProducts} from "../controllers/Product.controller.js";
import { auth, isShopkeeper, isOwner} from "../middlewares/auth.middleware.js";
// import { get } from "http";
const router = express.Router();

//Protected routes
//Add a middleware to check that the user is from this shop only
router.route('/shops/products').post(auth, isShopkeeper, isOwner,  createProduct); //create a new product
router.route('/shops/products/:productId').put(auth, isShopkeeper, isOwner, updateProduct);  //update a product
router.route('/shops/products/:productId').delete(auth, isShopkeeper, isOwner, deleteProduct);  //delete a product

//Public routes
router.route('/products').get( getProducts); //get all products
router.route('/shops/products/:productId').get(auth, getProductById); //get a product of a shop by id
router.route('/shops/products/shop/:shopId').get(auth, getProductsByShop); //get all products of a shop

export default router;