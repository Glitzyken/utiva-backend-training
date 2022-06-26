const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).json({
      message: "token required.",
    });
  }

  const token = req.cookies.jwt;
  let decoded;

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "token invalid.",
    });
  }

  // check if token has expired
  if (Date.now() >= decoded.exp * 1000) {
    return res.status(401).json({
      message: "token expired.",
    });
  }

  // check if the user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(404).json({
      message: "user no longer exists.",
    });
  }

  // Grant access to protected routes
  req.user = currentUser;
  next();
};
