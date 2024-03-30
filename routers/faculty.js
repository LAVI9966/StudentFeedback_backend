import express from "express";
import bcryptjs from "bcryptjs";
import cors from "cors";
import Jwt from "jsonwebtoken";
import { Course } from "../models/Course.js";
import { Faculty } from "../models/faculty.js";
const jwtkey = "mynameislavish";
import { jwtDecode } from "jwt-decode";
import { CourseRating } from "../models/CourseRating.js";
import { FacultyRating } from "../models/facultyRating.js";
const router = express.Router();
router.use(express.json());
router.use(cors());

const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    req.token = token;
    next();
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

router.post("/addcourse", extractToken, async (req, res) => {
  const { name, code, semester, duration, headfacultyId } = req.body;
  try {
    // Check if a course with the same code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course code must be unique" });
    }

    // If the course code is unique, proceed to create the new course
    const cours = new Course({
      name,
      code,
      semester,
      duration,
      headfacultyId,
    });
    await cours.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.get("/fetchcourse/:facultyid", async (req, res) => {
  const headfacultyId = req.params.facultyid;
  try {
    console.log(headfacultyId);
    const response = await Course.find({ headfacultyId });
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.delete("/deletecourse/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/addfaculty", async (req, res) => {
  const { name, email, department, courseId } = req.body;
  try {
    // Check if the email already exists in the database
    const existingFaculty = await Faculty.findOne({
      email: email,
      courseId: courseId,
    });
    if (existingFaculty) {
      return res.status(400).json({ message: "Email must be unique" });
    }

    // If the email is unique, proceed to create the new faculty member
    const newFaculty = new Faculty({ name, email, department, courseId });
    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// GET route for fetching the list of faculty members
router.get("/fetchfaculty/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const facultyList = await Faculty.find({ courseId: _id });
    console.log(facultyList);
    res.status(200).send(facultyList);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/deletefaculty/:id", async (req, res) => {
  try {
    const facultyId = req.params.id;
    const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);
    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res.status(200).json({ message: "Faculty member deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.get("/fetchcourseratings/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  console.log("ye id he", courseId);
  try {
    const rating = await CourseRating.find({ courseId });
    if (rating) {
      res.status(200).send(rating);
    } else {
      res.status(400).send({ message: "Rating Not Found" });
    }
  } catch (error) {}
});
router.get("/fetchfacultyratings/:facultyId", async (req, res) => {
  const facultyId = req.params.facultyId;
  console.log("ye id he", facultyId);
  try {
    const rating = await FacultyRating.find({ facultyId });
    if (rating) {
      res.status(200).send(rating);
    } else {
      res.status(400).send({ message: "Rating Not Found" });
    }
  } catch (error) {}
});
export default router;
