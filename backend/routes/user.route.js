import express from 'express';

const router = express.Router();

import {login, signup, logout, getProfile} from '../controllers/Auth.controller';
import {auth, isUser} from '../middlewares/auth.middleware';

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resetToken', resetPassword);

//AuthN route
router.get('/dashboard', auth, (req, res) => {
    res.send('Welcome to Dashboard page');
});

//Protected routes
router.get("/getProfile", auth, isUser, (req,res)=>{
    res.json({
        success:true,
        message:'Welcome to protected User route.',
    });
})

// router.get("/shopkeeper", auth, isShopkeeper, (req,res)=>{
//     res.json({
//         success:true,
//         message:'Welcome to protected ShopKeeper route.',
//     });
// })

module.exports = router;