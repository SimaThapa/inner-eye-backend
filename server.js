const dotenv=require('dotenv');
dotenv.config();              //or require('dotenv).config();
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const port=8000;
const cookieParser=require("cookie-parser");
var cors = require('cors');

const mongoosedb=require('./dbConfig/mongodb.congif');
mongoosedb();
const serviceRouter=require('./routes/service.route');
const gallayRouter=require("./routes/gallaryRoutes/gallary.route");
const blogRouter=require('./routes/blog.routes/blog.route');
const userRoutes=require("./routes/userRoutes/user.route");
const createRoutes=require("./routes/registration.routes/registration.route");

// const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use(express.json());
//cookie-parser
app.use(cookieParser());

app.use(cors({
    origin:"*",
    credentials:true,
    methods:"GET,HEAD,PUT,PATCH,DELETE"
    })
)

//routes
app.use("/service",serviceRouter);
app.use("/gallary",gallayRouter);
app.use("/blog",blogRouter);
app.use("/user",userRoutes);
app.use("/registration",createRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
