const Income = require("../../models/income.model");
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) return res.status(404).json({ message: "Income not found" });

    res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteIncome = deleteIncome;
