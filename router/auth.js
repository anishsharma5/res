const express = require("express")

const router = express.Router();
require("../db/connect")
const User =require("../model/userSchema")
const middleware=(req,res,next)=>{
  console.log("middlware");
  next();
 }
router.get("/",(req,res)=>{
  res.status(200).send("Hello World router")
 })
 router.get("/about", middleware,(req,res)=>{
  res.status(200).send("Hello from about")
 })
 
 router.get("/signup",(req,res)=>{
  res.status(200).send("Hello from signin")
 })
 router.get("/loginin",(req,res)=>{
  res.status(200).send("Hello from login")
 })


 router.post('/register',(req,res)=>{
const {name,email,phone,password,confirmpassword}=req.body

if(!name|| !email|| !phone|| !password|| !confirmpassword){
  return res.status(422).json({error:"plzz fill all things"})
}
 
User.findOne({email:email}).then(
  (userExist)=>{
    if(userExist){
      return res.status(422).json({error:"email already exist"})
    }
    const user = new User({name,email,phone,password,confirmpassword})

    user.save().then(()=>{
      res.status(201).json({message: "successfully"})
      .catch((err)=> res.status(500).json({error: "failed"}));
     }).catch(err=>{console.log9ERR})
  }
)
 
 })
 module.exports = router;