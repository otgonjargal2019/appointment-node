const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler");
const organizationsController = require("../controllers/organization.controller");

router.get(
  "/types",
  asyncHandler(
    organizationsController.getBusinessTypes,
    organizationsController
  )
);

router.get(
  "/all",
  asyncHandler(
    organizationsController.getAllOrganizations,
    organizationsController
  )
);

router.get(
  "/newly-joined",
  asyncHandler(
    organizationsController.getNewlyJoinedOrganizations,
    organizationsController
  )
);

router.get(
  "/nearby",
  asyncHandler(
    organizationsController.getNearbyOrganizations,
    organizationsController
  )
);

module.exports = router;
