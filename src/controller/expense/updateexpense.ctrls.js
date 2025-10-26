const Expense = require("../../models/expense.model");
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Allowed fields to update
  const updates = {};
  const allowedFields = ["amount", "category", "description", "date"];

  // Only pick allowed fields from request body
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  // Validate amount if provided
  if (updates.amount !== undefined) {
    if (typeof updates.amount !== "number" || updates.amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
  }

  // Validate category if provided
  if (updates.category !== undefined && !updates.category.trim()) {
    return res.status(400).json({ message: "Category cannot be empty" });
  }

  try {
    // Find and update expense (must belong to user)
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true, runValidators: true } // return updated doc + validate
    ).select("-__v");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense updated successfully",
      expense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        updatedAt: expense.updatedAt,
      },
    });
  } catch (err) {
    console.error("Update expense error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateExpense };
