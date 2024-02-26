const mongoose=require('mongoose');

const user=process.env.MONGODB_USER;
const password=process.env.MONGODB_PASSWORD;
async function connectMongodb(){
    try{
        console.log("Hello",user);
        console.log("This is your password",password);
        
        await mongoose.connect('mongodb://localhost:27017');
        console.log('Database Connected');
    }catch(error){
        console.log('Error connecting to mongodb',error);
        process.exit()    
    }
}
module.exports=connectMongodb;