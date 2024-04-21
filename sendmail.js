import nodemailer from "nodemailer";
import { Course } from "./models/Course.js";
import { FacultyHead } from "./models/facultyhead.js";
import { Faculty } from "./models/faculty.js";
export const sendmail = async (req, res) => {
  const maildata = req.body;
  console.log(maildata);

  try {
    const cours = await Course.find({ _id: maildata.courseId });
    if (!cours || cours.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const headfacultyId = cours[0].headfacultyId;
    const facultydata = await FacultyHead.find({ _id: headfacultyId });
    if (!facultydata || facultydata.length === 0) {
      return res.status(404).json({ error: "Faculty head not found" });
    }

    console.log(facultydata);
    console.log(cours);
    const email = facultydata[0].email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "gehlodlavish@gmail.com",
        pass: "ybhd yomg psbv foxk",
      },
    });

    let info = await transporter.sendMail({
      from: {
        name: "lavish gehlod",
        address: "gehlodlavish@gmail.com",
      },
      to: `${email}`,
      subject: "Course Rating",
      text: `Someone rated YOur course ${cours[0].name}`,
      html: `<b>Someone rated Your course ${cours[0].name}. Go to Your DashBoard and See analytics of this course</b>`,
    });
    console.log("Message sent: %s", info.messageId);
    return res.json(info); // Ensure this is the last response sent
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Ensure this is the last response sent in case of an error
  }
};
export const sendmailfaculty = async (req, res) => {
  const maildata = req.body;
  console.log(maildata);

  try {
    const faculty = await Faculty.find({ _id: maildata.facultyId });
    if (!faculty || faculty.length === 0) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    const courseId = faculty[0].courseId;
    console.log(courseId);

    const cours = await Course.find({ _id: courseId });
    if (!cours || cours.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const headfacultyId = cours[0].headfacultyId;
    const facultydata = await FacultyHead.find({ _id: headfacultyId });
    if (!facultydata || facultydata.length === 0) {
      return res.status(404).json({ error: "Faculty head not found" });
    }
    const email = facultydata[0].email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "gehlodlavish@gmail.com",
        pass: "ybhd yomg psbv foxk",
      },
    });

    let info = await transporter.sendMail({
      from: {
        name: "lavish gehlod",
        address: "gehlodlavish@gmail.com",
      },
      to: `${email}`,
      subject: "Course Rating",
      text: `Someone rated YOur course ${facultydata[0].name}`,
      html: `<b>Someone rated Your Department Faculty Respected ${facultydata[0].name}. Go to Your DashBoard and See analytics of this Faculty</b>`,
    });
    console.log("Message sent: %s", info.messageId);
    return res.json(info); // Ensure this is the last response sent
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Ensure this is the last response sent in case of an error
  }
};
