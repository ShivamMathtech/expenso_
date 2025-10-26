const express = require("express");
const { getMyIncome } = require("../controller/income/getAllincome.ctrl");
const { authMiddleware } = require("../middleware/auth.middleware");
const { getIncomeById } = require("../controller/income/getincomeById.ctrl");
const { addIncome } = require("../controller/income/addIncome.ctrls");
const { updateIncome } = require("../controller/income/updateincome.ctrl");
const { deleteIncome } = require("../controller/income/deleteIncome.ctrls");
const incomeRouter = express.Router();
incomeRouter.get("/getAllIncome", authMiddleware, getMyIncome);
incomeRouter.get("/getIncome/:id", authMiddleware, getIncomeById);
incomeRouter.post("/addIncome", authMiddleware, addIncome);
incomeRouter.put("/updateIncome/:id", authMiddleware, updateIncome);
incomeRouter.delete("/deleteIcome/:id", authMiddleware, deleteIncome);

exports.incomeRouter = incomeRouter;
