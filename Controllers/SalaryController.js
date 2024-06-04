import Salary from "../Models/SalaryModel.js";

export const calculateSalary = async (req, res) => {
  const { basicSalary, earnings, deductions } = req.body;
  const totalEarnings =
    basicSalary + earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const grossEarnings = totalEarnings - totalDeductions;
  const grossSalaryForEPF =
    basicSalary +
    earnings
      .filter((e) => e.epfApplicable)
      .reduce((sum, e) => sum + e.amount, 0) -
    totalDeductions;
  const epf = grossSalaryForEPF * 0.08;
  const etf = grossSalaryForEPF * 0.03;
  const apit = grossEarnings * 0.18 - 25500;
  const netSalary = grossEarnings - epf - apit;
  const costToCompany = grossEarnings + grossSalaryForEPF * 0.12 + etf;

  const newSalary = new Salary({
    basicSalary,
    earnings,
    deductions,
    epf,
    etf,
    apit,
    netSalary,
    costToCompany,
  });

  try {
    await newSalary.save();
    res.json({ epf, etf, apit, netSalary, costToCompany });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error");
  }
};
