import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Userouter from "./routes/user.route.js";
import AuthRouter from "./routes/auth.route.js";

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
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is listening on 3000");
});

app.use("/api/user", Userouter);
app.use("/api/auth", AuthRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
