const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler");
const serviceController = require("../controllers/service.controller");

router.get(
  "/type/categories",
  asyncHandler(serviceController.getServiceTypeCategories, serviceController)
);

module.exports = router;
