import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Userouter from './routes/user.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is listening on 3000");
});

app.use("/api/user", Userouter);
