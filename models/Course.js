import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  headfacultyId: {
    type: String,
    required: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);
