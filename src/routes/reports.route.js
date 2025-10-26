const express = require("express");
const reportsRouter = express.Router();
const reportController = require("../controller/reports/reports.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
reportsRouter.get("/daily", authMiddleware, reportController.getDailyReport);
reportsRouter.get("/weekly", authMiddleware, reportController.getWeeklyReport);
reportsRouter.get(
  "/monthly",
  authMiddleware,
  reportController.getMonthlyReport
);
reportsRouter.get("/yearly", authMiddleware, reportController.getYearlyReport);
reportsRouter.get("/budget", authMiddleware, reportController.getBudgetReport);

exports.reportsRouter = reportsRouter;
