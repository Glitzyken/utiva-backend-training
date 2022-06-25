const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  birthYear: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
