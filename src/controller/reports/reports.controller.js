const Income = require("../../models/income.model");
const Expense = require("../../models/expense.model"); // assuming you have an Expense model

const getDateRange = (type) => {
  const now = new Date();
  let start, end;
  end = now;

  switch (type) {
    case "daily":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "weekly":
      const firstDayOfWeek = now.getDate() - now.getDay(); // Sunday = 0
      start = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case "monthly":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "yearly":
      start = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      start = new Date("1970-01-01");
  }

  return { start, end };
};

const generateReport = async (userId, type) => {
  const { start, end } = getDateRange(type);

  const incomes = await Income.find({
    user: userId,
    date: { $gte: start, $lte: end },
  });
  const expenses = await Expense.find({
    user: userId,
    date: { $gte: start, $lte: end },
  });

  const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance, incomes, expenses };
};

// Controller functions
const getDailyReport = async (req, res) => {
  try {
    const report = await generateReport(req.user._id, "daily");
    res.json({ success: true, type: "daily", data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getWeeklyReport = async (req, res) => {
  try {
    const report = await generateReport(req.user._id, "weekly");
    res.json({ success: true, type: "weekly", data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMonthlyReport = async (req, res) => {
  try {
    const report = await generateReport(req.user._id, "monthly");
    res.json({ success: true, type: "monthly", data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getYearlyReport = async (req, res) => {
  try {
    const report = await generateReport(req.user._id, "yearly");
    res.json({ success: true, type: "yearly", data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Optional: Budget vs Expense report
const getBudgetReport = async (req, res) => {
  try {
    // assuming you store a budget field in user model or separate collection
    const budget = req.user.budget || 0;

    const expenses = await Expense.find({ user: req.user._id });
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    res.json({
      success: true,
      data: {
        budget,
        totalExpense,
        remaining: budget - totalExpense,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getDailyReport,
  getWeeklyReport,
  getMonthlyReport,
  getYearlyReport,
  getBudgetReport,
};
