import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import salaryRoutes from "./Routes/SalaryRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongo DB Connected!"))
  .catch((err) => console.log("MongoDB Connect error:", err));

app.use("/api/salary", salaryRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
