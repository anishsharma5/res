const dotenv=  require("dotenv")
const mongoose=require("mongoose")


const express = require("express")
const app = express();
dotenv.config({path:'./config.env'})
app.use(express.json());
require('./db/connect');
 const cors = require("cors");
app.use(cors());

// const User=require("./model/userSchema")



app.use(require('./router/auth'))


 const PORT = process.env.PORT

 

 /// middeleware

 const middleware=(req,res,next)=>{
  console.log("middlware");
  next();
 }

 app.get("/",(req,res)=>{
  res.status(200).send("Hello World")
 })

 app.listen(PORT,()=>{
  console.log(`server is running at 4000 ${PORT}`);
 })