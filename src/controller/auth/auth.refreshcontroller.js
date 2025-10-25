const refreshwebtokenController = async (req, res) => {
  res.status(200).json({
    msg: "refresh the jwttoken",
  });
};

exports.refreshwebtokenController = refreshwebtokenController;
