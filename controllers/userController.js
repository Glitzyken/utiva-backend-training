const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone
  ) {
    return res.status(400).json({
      message: "User info is required.",
    });
  }

  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
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
