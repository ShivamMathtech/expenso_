const express = require("express");
const cors = require("cors");
const { authrouters } = require("./routes/auth.routes");
const { ConnectDB } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { expenseRouter } = require("./routes/expense.route");
const { incomeRouter } = require("./routes/income.route");
const { reportsRouter } = require("./routes/reports.route");
const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
// Auth Router handle here
app.use("/auth", authrouters);
app.use("/api", userRouter);
app.use("/expense", expenseRouter);
app.use("/income", incomeRouter);
app.use("/reports", reportsRouter);
exports.app = app;
