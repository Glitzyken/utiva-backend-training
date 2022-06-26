const bcrypt = require("bcryptjs");

exports.passwordMiddleware = async (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      message: "Password is required.",
    });
  }

  // Harsh password
  req.body.password = await bcrypt.hash(req.body.password, 12);

  next();
};
