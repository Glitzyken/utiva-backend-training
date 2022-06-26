const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const createSendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.createUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phone) {
    return res.status(400).json({
      message: "User info is required.",
    });
  }

  const user = await User.create(req.body);

  createSendToken(user, 201, req, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "email and password are required.",
    });
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email });

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!user || !correctPassword) {
    return res.status(401).json({
      message: "Incorrect email or password.",
    });
  }

  // If everything ok, send token to client
  createSendToken(user, 200, req, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    numberOfDocs: users.length,
    data: {
      users,
    },
  });
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  let user;

  try {
    user = await User.findById(id);
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.updateOneUser = async (req, res) => {
  const { id } = req.params;
  let user;

  try {
    user = await User.findOneAndUpdate({ _id: id }, req.body);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
