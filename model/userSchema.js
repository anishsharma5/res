const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
  name :{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  phone:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  confirmpassword:{
    type: String,
    required:true
  },
  tokens: [
    {
      token: {
        type:String,
        required:true
      }
    }
  ]

})


/// hashing the password

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

//generating jwttoken

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    console.log("token Error");
    
  }
}


userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.confirmpassword);
};

const User = mongoose.model("User",userSchema)
module.exports = User;
