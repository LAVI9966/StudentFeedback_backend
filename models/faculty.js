// backend/models/Faculty.js

import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // This ensures that the email is unique
  },
  department: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
});

export const Faculty = mongoose.model("Faculty", FacultySchema);
