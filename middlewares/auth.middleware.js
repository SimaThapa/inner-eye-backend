const jwt=require('jsonwebtoken');
const {User}=require('../models/user.model');
const { errorHandler } = require('../utils/errorHandlers');
const verifyJWT=async(req,res,next)=>{
    const token=req.cookies?.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            statusCode:401,
            message:'Unauthorized - No token provided',
            success:false
        })
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    console.log("THIS IS DECODE",decode);
    //verify token
    
    try{
        const user=await User.findById(decode._id);
        console.log(user);
        if(!user){  
            return res.status(404).json({
                message:'User not found',
                statusCode:404,
                success:false,
                data:user
            })
        }
        req.user=user;
        next();
    }
    
    catch(error){
        errorHandler(error,res);
    }              
    }       
    
module.exports={
    verifyJWT
}