import mongoose from "mongoose";
const CourseRatingSchema = new mongoose.Schema({
  studentId: [
    {
      type: String,
      required: true,
    },
  ],
  sem: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  ratings: [
    {
      question1: { type: Number, required: true },
      question2: { type: Number, required: true },
      question3: { type: Number, required: true },
      question4: { type: Number, required: true },
      question5: { type: Number, required: true },
      comments: { type: String, required: false },
    },
  ],
});

export const CourseRating = mongoose.model("CourseRating", CourseRatingSchema);
