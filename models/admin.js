import mongoose from "mongoose";
const Adminschema = mongoose.Schema({
  role:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})
export const Admin = mongoose.model('Admin',Adminschema);
