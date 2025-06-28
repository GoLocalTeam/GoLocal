import express from "express";
import { auth, isShopkeeper, isOwner} from "../middlewares/auth.middleware.js";
import { createService, deleteService, getServiceById, getServices, getServicesByShop, updateService } from "../controllers/Service.controller.js";
// import { get } from "http";
const router = express.Router();

//Protected routes
//Add a middleware to check that the user is from this shop only
router.route('/shops/:shopId/services').post(auth, isShopkeeper, isOwner,  createService); //create a new service
router.route('/shops/:shopId/services/:serviceId').put(auth, isShopkeeper, isOwner, updateService);  //update a service
router.route('/shops/:shopId/services/:serviceId').delete(auth, isShopkeeper, isOwner, deleteService);  //delete a service

//Public routes
router.route('/services').get(getServices); //get all services
router.route('/shops/:shopId/services/:serviceId').get(auth, getServiceById); //get a service of a shop by id
router.route('/shops/:shopId/services').get(auth, getServicesByShop); //get all services of a shop

export default router;