const express = require("express");
const cors = require("cors");
const { authrouters } = require("./routes/auth.routes");
const { ConnectDB } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
// Auth Router handle here
app.use("/auth", authrouters);
app.use("/api", userRouter);
exports.app = app;
