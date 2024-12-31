const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler");
const organizationsController = require("../controllers/organization.controller");
const specialistController = require("../controllers/specialist.controller");
const specialistServicesController = require("../controllers/specialistServices.controller");

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

router.get(
  "/:organizationId/details",
  asyncHandler(
    organizationsController.getOrganizationDetail,
    organizationsController
  )
);

router.get(
  "/:organizationId/specialists",
  asyncHandler(
    specialistController.getSpecialistsByOrganization,
    specialistController
  )
);

router.get(
  "/:organizationId/:specialistId/services",
  asyncHandler(
    specialistServicesController.getSpecialistServices,
    specialistServicesController
  )
);

module.exports = router;
