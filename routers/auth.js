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
    next();
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

router.post("/signup", async (req, res) => {
  const { role, name, sem, email, password } = req.body;
  if (role === "student") {
    if (!role || !name || !sem || !email || !password) {
      console.log("provide all data");
      return res.status(404).send({ message: "Provide all the details" });
    }
    try {
      const studentexist = await Student.findOne({ email: email });
      if (studentexist) {
        return res.status(422).send({ message: "Email Already present " });
      } else {
        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Create a newStudent
        const newStStudent = new Student({
          role,
          name,
          sem,
          email,
          password: hashedPassword, // Store the hashed password
        });
        await newStStudent.save();
        // Send a success response
        // Generate a JWT token
        const token = Jwt.sign(
          {
            id: newStStudent._id,
            role: newStStudent.role,
            sem: newStStudent.sem,
          },
          jwtkey,
          {
            expiresIn: "1h",
          }
        );

        // Send a response with the token
        return res.status(200).send({ token });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  } else if (role === "admin") {
    if (!role || !name || !email || !password) {
      console.log("provide all data");
      return res.status(404).send({ message: "Provide all the details" });
    }
    try {
      const Adminexist = await Admin.findOne({ email: email });
      if (Adminexist) {
        return res.status(422).send({ message: "Email Already present " });
      } else {
        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Create a newAdmin
        const newAdmin = new Admin({
          role,
          name,
          email,
          password: hashedPassword, // Store the hashed password
        });
        await newAdmin.save();
        // Send a success response
        console.log(newAdmin);
        // Generate a JWT token
        const token = Jwt.sign(
          { id: newAdmin._id, role: newAdmin.role },
          jwtkey,
          {
            expiresIn: "1h",
          }
        );

        // Send a response with the token
        return res.status(200).send({ token });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
});
router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res
      .status(400)
      .send({ message: "Please provide role, email, and password" });
  }

  try {
    // Find the user by role and email
    let user;
    switch (role) {
      case "student":
        user = await Student.findOne({ email: email });
        break;
      case "teacher":
        user = await FacultyHead.findOne({ email: email });
        break;
      case "admin":
        user = await Admin.findOne({ email: email });
        break;
      default:
        return res.status(400).send({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    if (role === "student") {
      const token = Jwt.sign(
        { id: user._id, role: user.role, sem: user.sem },
        jwtkey,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({ token });
    }
    const token = Jwt.sign({ id: user._id, role: user.role }, jwtkey, {
      expiresIn: "1h",
    });

    // Send a response with the token
    return res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/addheadfaculty", extractToken, async (req, res) => {
  try {
    // Destructure the request body to get the form data
    const { role, name, email, department, password } = req.body;

    const userexist = await FacultyHead.findOne({ email: email });
    if (userexist && userexist.email === email) {
      res.status(422).json({ message: "Email Already Present" });
      return;
    }
    // Create a new instance of the FacultyHead model
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newFacultyHead = new FacultyHead({
      role,
      name,
      email,
      department,
      password: hashedPassword, // Make sure to hash the password before saving it to the database
    });

    // Save the new faculty head to the database
    await newFacultyHead.save();

    // Send a success response
    res.status(201).json({ message: "Faculty Head added successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the faculty head" });
  }
});

export default router;
