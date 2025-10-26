// controllers/expenseController.js
const Expense = require("../../models/expense.model");

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Find and delete expense (must belong to user)
    const expense = await Expense.findOneAndDelete({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense deleted successfully",
      deletedExpense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
      },
    });
  } catch (err) {
    console.error("Delete expense error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { deleteExpense };
