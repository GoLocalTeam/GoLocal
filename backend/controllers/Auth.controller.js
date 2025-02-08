const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config(); //to load the jwt token = golocal in this file

//Signup controller
exports.signup = async (req, res) => {
    try {
        //get the data from the request body
        const {name, email, password, role, profilePicture, location} = req.body;

        //data validation
        if (!name || !email || !password || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10); //10 no. of rounds se pd ko hash kro  
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'Error in Hashing Password',
            });
        }

        //create a new user
        const user = await User.create({
            name, email, password: hashedPassword, role, profilePicture, location
        });

        //send the response
        return res.status(201).json({
            success:true,
            message:'User created successfully',
            data:user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//Login controller
exports.login = async (req,res)=>{
    try{
        //data fetch
        const{email,password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the details carefully',
            });
        }
        
        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not found',
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };

        //verify pwd & genereate a JWT token
        if(await bcrypt.compare(password,user.password)){
            //pwd matched then create a token
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",});

            user.token = token;
            user.password = undefined; //to remove pwd from user object

            const options = {
                expires: new Date(Date.now()+3*24*60*60*1000), //valid for 3 days
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'User logged in successfully',
            })
             
        }
        else{
            //pwd do not match
            return res.status(403).json({
                success:false,
                message:"Password is Incorrect",
            });
        }
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'login failure',
        })
    }
}

//Logout controller
exports.logout = async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            success:true,
            message:'User logged out successfully',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'logout failure',
        })
    }
}

//Get user controller
exports.getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        }
        return res.status(200).json({
            success:true,
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal server error',
        });
    }
}

//Update user controller


