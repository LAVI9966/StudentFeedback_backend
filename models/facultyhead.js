import mongoose from "mongoose";
const FacultyHeadSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});
export const FacultyHead = mongoose.model("FacultyHead", FacultyHeadSchema);
