const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to User model
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter income title"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please enter income amount"],
      min: [0, "Income amount cannot be negative"],
    },
    source: {
      type: String,
      enum: ["Salary", "Business", "Freelance", "Investment", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
