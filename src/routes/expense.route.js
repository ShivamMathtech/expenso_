const express = require("express");
const { addExpense } = require("../controller/expense/addexp.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getExpenseById,
} = require("../controller/expense/getexpensebyid.ctrls");
const { getAllExpenses } = require("../controller/expense/getallexpense.ctrls");
const { updateExpense } = require("../controller/expense/updateexpense.ctrls");
const { deleteExpense } = require("../controller/expense/deleteexpense.ctrls");
const {
  getExpensesByCategory,
} = require("../controller/expense/getcategory.ctrls");
const expenseRouter = express.Router();
expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/getExpense/:id", authMiddleware, getExpenseById);
expenseRouter.get("/getAllExpense", authMiddleware, getAllExpenses);
expenseRouter.put("/updateExpense/:id", authMiddleware, updateExpense);
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/category/:category", authMiddleware, getExpensesByCategory);
exports.expenseRouter = expenseRouter;
