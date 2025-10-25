const express = require("express");
const {
  registerController,
} = require("../controller/auth/auth.registercontroller");
const { loginController } = require("../controller/auth/auth.logincontroller");
const {
  logoutController,
} = require("../controller/auth/auth.logoutcontroller");
const {
  refreshwebtokenController,
} = require("../controller/auth/auth.refreshcontroller");
const { forgetpsdctrl } = require("../controller/auth/auth.forgetcontroller");
const { resetpadctrls } = require("../controller/auth/auth.restpsdctrl");
const authrouters = express.Router();
// Authentication Router

authrouters.post("/register", registerController);
authrouters.post("/login", loginController);
authrouters.post("/logout", logoutController);
authrouters.post("/refresh", refreshwebtokenController);
authrouters.post("/forget-password", forgetpsdctrl);
authrouters.post("/reset-password/:token", resetpadctrls);

module.exports = { authrouters };
