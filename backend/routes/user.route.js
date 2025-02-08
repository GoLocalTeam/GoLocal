const express = require('express');
const router = express.Router();

const {login, signup, logout, getProfile} = require('../controllers/Auth.controller');
const {auth, isUser} = require('../middlewares/auth.middleware');

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