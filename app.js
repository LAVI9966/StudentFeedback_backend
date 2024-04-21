import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config({ path: "./config.env" });
import "./db/conn.js";
import authrouter from "./routers/auth.js";
import adminrouter from "./routers/admin.js";
import facultyauth from "./routers/faculty.js";
import studentauth from "./routers/student.js";
import Jwt from "jsonwebtoken";
import { sendmail } from "./sendmail.js";
import { sendmailfaculty } from "./sendmail.js";

const __filename = fileURLToPath(import.meta.url);
const app = express();
app.use(authrouter);
app.use(adminrouter);
app.use(facultyauth);
app.use(studentauth);
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the actual origin of your frontend app
  })
);

app.post("/sendmail", sendmail);
app.post("/sendmailfaculty", sendmailfaculty);

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });
// app.get("/login", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
// });

app.listen(process.env.PORT, () => {
  console.log("Server start");
});
