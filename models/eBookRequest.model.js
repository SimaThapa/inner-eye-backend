const mongoose=require('mongoose');
const {Schema}=mongoose;
const EBookRequestSchema=new Schema({
    name:{
        type:string,
        required:true

    },
    email:{
        type:string,
        required:true
    }
})
const EBook=mongoose.model('EBook',EBoolRequestSchema);
module.exports={
    EBook
}