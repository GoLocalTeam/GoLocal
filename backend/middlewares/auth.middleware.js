import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Shop from "../models/Shop.js";
import Product from "../models/Product.js";
dotenv.config();

export const auth = (req,res,next)=>{
    try{
        //extract jwt token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(400).json({
                success:false,
                message:'Token missing',
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            });
        }
        next();   //to go to the next middleware
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
}

// AuthZ middlewares
export const isUser = (req,res,next)=>{
    try{
        if(req.user.role === 'user'){
            next();
        }else{
            return res.status(403).json({
                success:false,
                message:'You are not authorized to access this route',
            });
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error',
        });
    }
}

export const isShopkeeper = (req,res,next)=>{
    try{
        if(req.user.role === 'shopkeeper'){
            next();
        }else{
            return res.status(403).json({
                success:false,
                message:'You are not authorized to access this route',
            });
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error',
        });
    }
}


export const isOwner = async (req, res, next) => {    
    try {
        // Find the shop by ID
        const prod_id = req?.params?.productId;
        // const shop_id = await Product.findById(prod_id).shop || req?.body?.shop;
        const product = await Product.findById(prod_id);
        const shop_id = product?.shop || req?.body?.shop;
        const shop = await Shop.findById(shop_id);  
        console.log(prod_id);
        console.log(shop_id);
        console.log(shop); 
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: 'Shop not found from isOwner middleware',
            });
        }
        // Get the owner's ID as a string
        const owner = shop.owner.toString();
        // Check if the logged-in user is the owner
        if (req.user.id === owner) {
            return next(); // Proceed to the next middleware
        } else {
            return res.status(403).json({
                success: false,
                message: 'You are not the owner of this shop',
            });
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
