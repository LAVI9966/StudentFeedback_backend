import mongoose from "mongoose";
const FacultyRatingSchema = new mongoose.Schema({
  studentId: [
    {
      type: String,
      required: true,
    },
  ],
  // sem: {
  //   type: String,
  //   required: true,
  // },
  facultyId: {
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

export const FacultyRating = mongoose.model(
  "FacultyRating",
  FacultyRatingSchema
);
