import express from "express";
import { login, signup, logout, getProfile } from "../controllers/Auth.controller.js";
import { auth, isUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getProfile').get(auth, isUser, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected User route.',
        user : req.user,
    });
});

router.route('/dashboard').get(auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Dashboard page.',
    });
});


// router.route('/shopkeeper').get(auth, isShopkeeper, (req, res) => {
//     res.json({
//         success: true,
//         message: 'Welcome to the protected ShopKeeper route.',
//     });
// });

export default router;