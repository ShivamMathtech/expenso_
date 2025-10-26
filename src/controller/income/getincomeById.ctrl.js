const Income = require("../../models/income.model");
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.status(200).json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getIncomeById = getIncomeById;
