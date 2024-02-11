const mongoose=require('mongoose');
const {Schema}=mongoose;
const servicesSchema=new Schema({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true,
    },

})
const Service=mongoose.model('Service',servicesSchema);
module.exports={
    Service
}