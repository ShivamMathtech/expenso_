const Income = require("../../models/income.model");
const updateIncome = async (req, res) => {
  try {
    const { title, amount, source, date, notes } = req.body;

    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, amount, source, date, notes },
      { new: true, runValidators: true }
    );

    if (!income) return res.status(404).json({ message: "Income not found" });

    res.status(200).json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateIncome = updateIncome;
