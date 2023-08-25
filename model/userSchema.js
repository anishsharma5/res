const mongoose = require('mongoose')
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


userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.confirmpassword);
};

const User = mongoose.model("User",userSchema)
module.exports = User;
