const {Service}=require('../models/service.model');
const {errorHandler}=require('../utils/errorHandlers');

const createService=async(req,res)=>{
    const {title, description}=req.body;
    console.log(req.user);
    try{
        const service=await Service.create({title, description});
        return res.status(201).json({
            message:'Service created successfully',
            data:service,
            success:true,
            statusCode:201,
        });
    }catch(error){
        errorHandler(error,res);
    }

}
const getService=async(req,res)=>{
    try{
        const services=await Service.find();
        if(!services){
            return res.status(404).json({
                message:'Service not found',
                success:false,
                statusCode:404
            })
        }
        return res.status(200).json({
            message:'Service retrived successfully',
            data:services,
            success:true,
            statusCode:200,
        });
    }catch(error){
        errorHandler(error,res)
    }
}

// update the service
const updateService=async(req,res)=>{
    const {id}=req.params;
    const {title, description}=req.body;
    try{
        const service=await Service.findByIdAndUpdate(id,{title, description},{new:true});
        res.status(200).json({
            message:'Update is done successfully',
            data:service,
            success:true,
            statusCode:200,
        });
    }catch(error){
        errorHandler(error,res)
    }
}

const deleteService=async(req,res)=>{
    const {id}=req.params;
    const {title, description}=req.body;
    try{
        const service=await Service.findByIdAndDelete(id,{title, description});
        res.status(200).json({
            message:'Delete is done successfully',
            data:service,
            success:true,
            statusCode:200,
        });

    }catch(error){
        errorHandler(error,res)
    }
}

module.exports={
    createService,
    getService,
    updateService,
    deleteService
}