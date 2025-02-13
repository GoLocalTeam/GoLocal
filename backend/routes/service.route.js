import express from "express";
import { auth, isShopkeeper, isOwner} from "../middlewares/auth.middleware.js";
import { createService, deleteService, getServiceById, getServices, getServicesByShop, updateService } from "../controllers/Service.controller.js";
// import { get } from "http";
const router = express.Router();

//Protected routes
//Add a middleware to check that the user is from this shop only
router.route('/shops/services').post(auth, isShopkeeper, isOwner,  createService); //create a new product
router.route('/shops/services/:serviceId').put(auth, isShopkeeper, isOwner, updateService);  //update a product
router.route('/shops/services/:serviceId').delete(auth, isShopkeeper, isOwner, deleteService);  //delete a product

//Public routes
router.route('/services').get(getServices); //get all products
router.route('/shops/services/:serviceId').get(auth, getServiceById); //get a product of a shop by id
router.route('/shops/services/shop/:shopId').get(auth, getServicesByShop); //get all products of a shop

export default router;