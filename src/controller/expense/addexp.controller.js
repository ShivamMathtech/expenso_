const Expense = require("../../models/expense.model");
const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  // Validate
  if (!amount || !category) {
    return res
      .status(400)
      .json({ message: "Amount and category are required" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  try {
    const expense = new Expense({
      user: req.user.id,
      amount,
      category: category.trim(),
      description: description?.trim(),
      date: date ? new Date(date) : new Date(),
    });

    const saved = await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense: {
        id: saved._id,
        amount: saved.amount,
        category: saved.category,
        description: saved.description,
        date: saved.date,
        createdAt: saved.createdAt,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense };
