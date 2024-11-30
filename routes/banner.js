const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler");
const bannerController = require("../controllers/banner.controller");

router.get("/main", asyncHandler(bannerController.getMain, bannerController));

router.get(
  "/trending",
  asyncHandler(bannerController.getTrending, bannerController)
);

module.exports = router;
