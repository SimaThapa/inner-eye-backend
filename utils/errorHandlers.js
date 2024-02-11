function errorHandler(error,res){
    console.log(error);
    return res.status(500).json({
        message:'An error occurred',
        error:error,
    })
}
module.exports={
    errorHandler
}