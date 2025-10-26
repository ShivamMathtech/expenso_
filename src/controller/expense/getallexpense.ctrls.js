const Expense = require("../../models/expense.model");
const getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Optional filters
  const { category, startDate, endDate } = req.query;
  const filter = { user: userId };

  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await Expense.countDocuments(filter);

    res.json({
      message: "Expenses fetched successfully",
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
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
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllExpenses = getAllExpenses;
