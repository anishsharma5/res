const dotenv=  require("dotenv")

const mongoose = require("mongoose")
const express = require("express")
const app = express();
dotenv.config({path:'./config.env'})
app.use(express.json());
require('./db/connect')

// const User=require("./model/userSchema")



app.use(require('./router/auth'))


 const PORT = process.env.PORT|| 4000

 

 /// middeleware

 const middleware=(req,res,next)=>{
  console.log("middlware");
  next();
 }

 app.get("/",(req,res)=>{
  res.status(200).send("Hello World")
 })
//  app.get("/about", middleware,(req,res)=>{
//   res.status(200).send("Hello from about")
//  })
 
//  app.get("/signup",(req,res)=>{
//   res.status(200).send("Hello from signin")
//  })
//  app.get("/loginin",(req,res)=>{
//   res.status(200).send("Hello from login")
//  })
 app.listen(PORT,()=>{
  console.log(`server is running at 4000 ${PORT}`);
 })