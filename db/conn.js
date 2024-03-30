import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connect");
  })
  .catch((e) => {
    console.log(e);
  });
