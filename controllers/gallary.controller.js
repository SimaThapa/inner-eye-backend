const {Gallary}=require('../models/gallary.model');
const { errorHandler } = require('../utils/errorHandlers');
fs=require('fs');
const createGallary=async(req,res)=>{
    console.log(req.file);
    console.log(req.files);

    let newGallary=req.files.map(function(val){             //getting the path of image through loop/map
       return{
            image:val.path
       }

    })

    try{
        const gallaryResponse=await Gallary.insertMany(newGallary)
        console.log(gallaryResponse);
        return res.status(200).json({
            message:'Gallary Created Successfully',
            data:gallaryResponse,
            success:true,
            statusCode:200
        })
    }catch(error){
        errorHandler(error,res);
    }
}

const deleteGallary=async(req,res)=>{
    try{
        let imagesIds=req.body?.images;
        
        const findImg=await Gallary.find({_id: {$in:imagesIds}});
        if(findImg.length === 0){
            return res.status(200).json({
                message:'Image Length is Zero'
            })
        }
        console.log(findImg);
        console.log("I am here");
        
        const result=await Gallary.deleteMany({_id: {$in:imagesIds}});
        

        findImg.forEach((val)=>{
            fs.unlink(val.image).then(()=>{
            console.log("Image is finally Deleted");
        })
        .catch((err)=>{
            console.log("Image is not found");
        })
    
    })
        return res.status(200).json({
            message:'Image deleted succesfully',
            data:result,
            success:true,
            statusCode:200
        })
        
        }
        // console.log(findImg);
        catch(error){
        errorHandler(error,res)
    }
}

const getGallary=async(req,res)=>{
    try{
        const gallary=await Gallary.find();
        return res.status(200).json({
            message:'Image fetched successfully',
            data:gallary,
            success:true,
            statusCode:200
        })

    }catch(error){
        errorHandler(error,res);
    }
}
const updateGallary=async(req,res)=>{
    try{
        const {gallaryId}=req.body;

    }catch(error){
        errorHandler(error,res);
    }
}


module.exports={
    createGallary,
    deleteGallary,
    getGallary,
    updateGallary
}