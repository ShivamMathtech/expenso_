const express = require("express");
const reportsRouter = express.Router();
reportsRouter.get("/daily", (req, res) => {});
reportsRouter.get("/weekly", (req, res) => {});
reportsRouter.get("/monthly", (req, res) => {});
reportsRouter.get("/yearly", (req, res) => {});
reportsRouter.get("/budget", (req, res) => {});

exports.reportsRouter = reportsRouter;
