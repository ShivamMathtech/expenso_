// controllers/expenseController.js
const Expense = require("../../models/expense.model");

// controllers/expenseController.js
const getExpensesByCategory = async (req, res) => {
  let { category } = req.params;

  // TRIM THE SPACE!
  category = category.trim();

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  const userId = req.user.id;

  try {
    const expenses = await Expense.find({
      user: userId,
      category: category, // Now clean
    })
      .sort({ date: -1 })
      .select("-__v");

    res.json({
      message: "Expenses fetched successfully",
      category,
      count: expenses.length,
      expenses: expenses.map((exp) => ({
        id: exp._id,
        amount: exp.amount,
        category: exp.category,
        description: exp.description,
        date: exp.date,
        createdAt: exp.createdAt,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getExpensesByCategory };
