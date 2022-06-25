const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const foodCropsRoutes = require("./routes/foodCropsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to the database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection is successful! 🥳"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use("/api/v1/food-crops/", foodCropsRoutes);
app.use("/api/v1/users/", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Web server is started on port ${port}!`);
});
