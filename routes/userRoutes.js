const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateOneUser);
router.route("/").get(userController.getUsers).post(userController.createUser);

module.exports = router;
