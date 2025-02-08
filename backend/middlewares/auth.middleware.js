import jwt from "jsonwebtoken";
dotenv.config();

exports.auth = (req,res,next)=>{
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
exports.isUser = (req,res,next)=>{
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