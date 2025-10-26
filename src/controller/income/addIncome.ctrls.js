const Income = require("../../models/income.model");
const addIncome = async (req, res) => {
  try {
    const { title, amount, source, date, notes } = req.body;

    const income = await Income.create({
      user: req.user.id,
      title,
      amount,
      source,
      date,
      notes,
    });

    res.status(201).json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addIncome = addIncome;
