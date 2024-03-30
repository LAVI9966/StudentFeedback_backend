import mongoose from "mongoose";
const Studentschema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const Student = mongoose.model("Student", Studentschema);
