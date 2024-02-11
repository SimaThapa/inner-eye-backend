const {ServiceRegistration}=require('../models/serviceRegistration.model');
const { errorHandler } = require('../utils/errorHandlers');

const createServiceRegitration=async(req,res)=>{
    const {name,email,phone,serviceId}=req.body;
    try{
        const serviceRegistration=await ServiceRegistration.create({name,email,phone,serviceId});
        res.status(201).json({
            message:'Service rigistration created successfully',
            statusCode:201,
            data:serviceRegistration,
            success:true
        })
    }catch(error){
        errorHandler(error,res);
    }
}
const getServiceRegistration=async (req,res)=>{
    try{
        const serviceRegistration=await ServiceRegistration.find().populate('service');
        if(!serviceRegistration){
            return res.status(404).json({
                message:'NO service registration found',
                success:false,
                ststusCode:404
            });
        }
        return res.status(200).json({
            message:'Service registration retrived successfully',
            data:serviceRegistration,
            success:true,
            ststusCode:200
        });
    }catch(error){
        errorHandler(error,res);
    }
}
module.exports={
    createServiceRegitration,
    getServiceRegistration
}