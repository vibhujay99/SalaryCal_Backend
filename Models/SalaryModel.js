import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  basicSalary: Number,
  earnings: [
    {
      description: String,
      amount: Number,
      epfApplicable: Boolean,
    },
  ],
  deductions: [
    {
      description: String,
      amount: Number,
    },
  ],
  epf: Number,
  etf: Number,
  apit: Number,
  netSalary: Number,
  costToCompany: Number,
  date: { type: Date, default: Date.now },
});

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
