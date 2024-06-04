import express from "express";
import { calculateSalary } from "../Controllers/SalaryController.js";

const router = express.Router();

router.post("/calculate", calculateSalary);

export default router;
