const express = require("express");
const { usergetController } = require("../controller/user/userme.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  updateUserProfilecontroller,
} = require("../controller/user/updateprofile.controller");
const userRouter = express.Router();
// Provide all the user Router
userRouter.get("/users/me", authMiddleware, usergetController);
userRouter.put("/users/me", authMiddleware, updateUserProfilecontroller);
userRouter.put("/users/me/pasword", (req, re) => {});

exports.userRouter = userRouter;
