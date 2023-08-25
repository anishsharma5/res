const jwt = require("jsonwebtoken")
const express = require("express")
const bcrypt = require("bcryptjs")
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


//  router.post('/register',(req,res)=>{
// const {name,email,phone,password,confirmpassword}=req.body

// if(!name|| !email|| !phone|| !password|| !confirmpassword){
//   return res.status(422).json({error:"plzz fill all things"})
// }
 
// User.findOne({email:email}).then(
//   (userExist)=>{
//     if(userExist){
//       return res.status(422).json({error:"email already exist"})
//     }
//     const user = new User({name,email,phone,password,confirmpassword})

//     user.save().then(()=>{
//       res.status(201).json({message: "successfully"})
//       .catch((err)=> res.status(500).json({error: "failed"}));
//      }).catch(err=>{console.log(error)})
//   }
// )
 
//  })

 
router.post('/register', async (req,res)=>{
  const {name,email,phone,password,confirmpassword}=req.body
  
  if(!name|| !email|| !phone|| !password|| !confirmpassword){
    return res.status(422).json({error:"plzz fill all things"})
  }

  try{
   const userExist = await User.findOne({email:email})
   
   if(userExist){
     return res.status(422).json({error:"email already exist"})
   }
   const user = new User({name,email,phone,password,confirmpassword})
   const userRegister = await user.save()
   if(userRegister){
    res.status(201).json({message: "User registersuccessfully"})
   }}

catch(error){
 console.log(error);
  }
   

   
   })
/// Login route 
router.post('/login', async (req, res) => {
  let token;
  
    const {email,password}= req.body;
    if (!email || !password){
      return res.status(400).json("plz fill the data")
    }
     const userLogin = await User.findOne({ email: email });
     console.log(userLogin)
  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password)
    token = await userLogin.generateAuthToken();
    console.log(token)
    res.cookie("jwtoken", token , {
      expires: new Date(Date.now() + 2589200000),
      httpOnly:true
    })
  if(!isMatch){
   res.status(400).json({error: "Invalid Credientials"})
  }
  else{
  res.json({message :"user login successfully"})
 }
 
  } else {
    res.status(400).json({error: "Invalid Credientials"})
    
  }

   }
    
   )


  
 module.exports = router;