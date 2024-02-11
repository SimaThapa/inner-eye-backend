const {User}=require('../models/user.model');
const { errorHandler } = require('../utils/errorHandlers');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds=10;

const registerUser=async(req,res)=>{
//hash password using bcrypt
//
    console.log(req.body);
    const {name,email,phoneNumber,password}=req.body;

    //encrypt password
    
    try{
        const hashPassword=await bcrypt.hash(password,saltRounds);

    const user=await User.create({
        name,
        email,
        phoneNumber,
        password:hashPassword
    })
    return res.status(201).json({
        statusCode:201,
        message:'User created Successfully',
        success:true,
        data:user,
  
    })
}catch(error){
    errorHandler(error,res);
}
}

const loginUser=async(req,res)=>{
    
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
        res.status(404).json({
            message:'User not found',
            data:null,          
            statusCode:404,
            success:false
        })
    }
    const matchPassword=await bcrypt.compare(password,user.password);
    if(!matchPassword){
        return res.status(400).json({
            message:'password Not matched',
            success:false,
            statusCode:400
        })
    }

    //jwt generate and setting token
    const token=jwt.sign({
        _id:user._id,
        email:user.email,
        name:user.name
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    }
    )
    console.log(process.env.JWT_SECRET);
    console.log("This is jwt token",token);
    
    //set cookie
    res.cookie("token",token)

    return res.status(200).json({
        message:"User loginned successfully",
        success:true,
        statusCode:200
    }
    )
    }catch(error){
        errorHandler(error,res)
    }
}

module.exports={
    registerUser,
    loginUser
}