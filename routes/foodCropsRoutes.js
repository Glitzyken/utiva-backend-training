const express = require("express");

const foodCropController = require("../controllers/foodCropsController");
const mutateCountry = require("../middlewares/mutateCountry");
const protect = require("../middlewares/protect");

const router = express.Router();

router.get(
  "/food-crops-from/:country",
  mutateCountry,
  foodCropController.getAllFoodCropsfromGivenCountry
);
router.get("/:id", foodCropController.getOneFoodCrop);

router
  .route("/")
  .get(foodCropController.getAllFoodCrops)
  .post(protect.protect, foodCropController.createFoodCrop);

module.exports = router;
