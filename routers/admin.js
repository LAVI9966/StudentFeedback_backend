import express from "express";
import bcryptjs from "bcryptjs";
import cors from "cors";
import { Student } from "../models/student.js";
import { Admin } from "../models/admin.js";
import { FacultyHead } from "../models/facultyhead.js";
import Jwt from "jsonwebtoken";
const jwtkey = "mynameislavish";
const router = express.Router();
router.use(express.json());
router.use(cors());

const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    req.token = token;
    console.log(token);
    next();
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

router.post("/updatesem", extractToken, async (req, res) => {
  try {
    const { currsem, newsem } = req.body;
    console.log(currsem, newsem);
    if (!currsem || !newsem) {
      res.status(422).send({ message: "Provide all details" });
      return;
    }
    const updatesem = await Student.updateMany(
      { sem: currsem },
      { $set: { sem: newsem } }
    );
    if (updatesem.nModified > 0) {
      return res.status(200).send({ message: "Semester updated successfully" });
    } else {
      return res
        .status(200)
        .send({ message: "No students found with the current semester" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
});
// Route to delete a faculty head by ID
router.delete("/deletehead/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await FacultyHead.findByIdAndDelete(id);
    res.status(200).json({ message: "Faculty head deleted successfully" });
  } catch (error) {
    console.error("Error deleting faculty head:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/fetchhead", async (req, res) => {
  try {
    const response = await FacultyHead.find();
    res.status(201).send(response);
  } catch (error) {
    console.error("Error fetching faculty heads:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
