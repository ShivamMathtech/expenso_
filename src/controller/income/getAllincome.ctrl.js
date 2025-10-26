const Income = require("../../models/income.model");
const getMyIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getMyIncome = getMyIncome;
