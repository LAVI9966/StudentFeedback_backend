import express from "express";
import cors from "cors";
import { Course } from "../models/Course.js";
import { CourseRating } from "../models/CourseRating.js";
import { FacultyRating } from "../models/facultyRating.js";
import { Faculty } from "../models/faculty.js";

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/fetchcoursename/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const name = await Course.findOne({ _id: courseId });
  console.log(name);
  res.send(name.name);
});
router.post("/fetchcourse", async (req, res) => {
  const { sem } = req.body;
  try {
    const response = await Course.find({ semester: sem });
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/submitcourserating", async (req, res) => {
  const { studentId, sem, ratings, courseId } = req.body;

  try {
    const findrating = await CourseRating.findOne({ courseId });
    if (findrating && findrating.courseId === courseId) {
      const arr = findrating.studentId;
      if (arr.includes(studentId)) {
        return res.status(400).send({ message: "You Already Rated" });
        // byy
      }

      arr.push(studentId);
      const rate = findrating.ratings;
      rate.push({
        question1: ratings.question1,
        question2: ratings.question2,
        question3: ratings.question3,
        question4: ratings.question4,
        question5: ratings.question5,
        comments: ratings.comments || "", // Assuming comments are optional and can be an empty string if not provided
      });
      await findrating.save();
    } else {
      // Ensure the ratings object matches the schema structure

      const ratingsubmitted = new CourseRating({
        studentId: [studentId],
        sem,
        courseId,
        ratings: [
          {
            question1: ratings.question1,
            question2: ratings.question2,
            question3: ratings.question3,
            question4: ratings.question4,
            question5: ratings.question5,
            comments: ratings.comments || "", // Assuming comments are optional and can be an empty string if not provided
          },
        ], // Use the formatted ratings object
      });
      await ratingsubmitted.save();
    }
    res.status(200).send({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/fetchfaculty", async (req, res) => {
  const { courseId } = req.body;
  console.log(courseId);
  try {
    const facultyy = await Faculty.find({ courseId });
    res.status(200).send(facultyy);
  } catch (error) {}
});
router.get("/fetchfacultyname/:facultyId", async (req, res) => {
  const courseId = req.params.facultyId;
  const name = await Faculty.findOne({ _id: courseId });
  console.log(name);
  res.send(name.name);
});
router.post("/submitfacultyrating", async (req, res) => {
  const { studentId, ratings, facultyId } = req.body;

  try {
    const findrating = await FacultyRating.findOne({ facultyId });
    if (findrating && findrating.facultyId === facultyId) {
      const arr = findrating.studentId;
      if (arr.includes(studentId)) {
        return res.status(400).send({ message: "You Already Rated" });
        // byy
      }
      arr.push(studentId);
      const rate = findrating.ratings;
      rate.push({
        question1: ratings.question1,
        question2: ratings.question2,
        question3: ratings.question3,
        question4: ratings.question4,
        question5: ratings.question5,
        comments: ratings.comments || "", // Assuming comments are optional and can be an empty string if not provided
      });
      await findrating.save();
    } else {
      // Ensure the ratings object matches the schema structure

      const ratingsubmitted = new FacultyRating({
        studentId: [studentId],
        // sem,
        facultyId,
        ratings: [
          {
            question1: ratings.question1,
            question2: ratings.question2,
            question3: ratings.question3,
            question4: ratings.question4,
            question5: ratings.question5,
            comments: ratings.comments || "", // Assuming comments are optional and can be an empty string if not provided
          },
        ], // Use the formatted ratings object
      });
      await ratingsubmitted.save();
    }
    res.status(200).send({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
export default router;
