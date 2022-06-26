const express = require("express");

const userController = require("../controllers/userController");
const userValidation = require("../middlewares/userValidation");

const router = express.Router();

router
  .route("/signup")
  .post(userValidation.passwordMiddleware, userController.createUser);

router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateOneUser);

router.route("/").get(userController.getUsers);

module.exports = router;
