const logoutController = async (req, res) => {
  res.status(200).json({
    msg: "logout successfully",
  });
};

exports.logoutController = logoutController;
