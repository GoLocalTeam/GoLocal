import express from "express";
import { createShop, updateShop, deleteShop, getShops, getShopById} from "../controllers/Shop.controller.js";
import { auth, isShopkeeper, isOwner} from "../middlewares/auth.middleware.js";
// import { get } from "http";
const router = express.Router();

//Protected routes
router.route('/shops').post(auth, isShopkeeper, createShop); //create a new shop
router.route('/shops/:shopId').put(auth, isShopkeeper, updateShop);  //update a shop
router.route('/shops/:shopId').delete(auth, isShopkeeper, deleteShop);  //delete a shop

//Public routes
router.route('/shops').get(auth, getShops); //get all shops
router.route('/shops/:shopId').get(auth, getShopById); //get a shop by id
// router.route('/shops/category/:category').get();

export default router;