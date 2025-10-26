const Expense = require("../../models/expense.model");
const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Find expense by ID and ensure it belongs to the user
    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense fetched successfully",
      expense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        createdAt: expense.createdAt,
        updatedAt: expense.updatedAt,
      },
    });
  } catch (err) {
    console.error("Get expense error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getExpenseById };
