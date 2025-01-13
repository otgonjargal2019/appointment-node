const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler");
const businessController = require("../controllers/business.controller");
const professionalController = require("../controllers/professional.controller");
const professionalServicesController = require("../controllers/professionalServices.controller");

// router.get(
//   "/types",
//   asyncHandler(businessController.getBusinessTypes, businessController)
// );

router.get(
  "/all",
  asyncHandler(businessController.getAllBusinesses, businessController)
);

router.get(
  "/newly-joined",
  asyncHandler(businessController.getNewlyJoinedBusinesses, businessController)
);

router.get(
  "/nearby",
  asyncHandler(businessController.getNearbyBusinesses, businessController)
);

router.get(
  "/:businessId/details",
  asyncHandler(businessController.getBusinessDetail, businessController)
);

router.get(
  "/:businessId/specialists",
  asyncHandler(
    professionalController.getProfessionalsByBusiness,
    professionalController
  )
);

router.get(
  "/:businessId/:professionalId/services",
  asyncHandler(
    professionalServicesController.getProfessionalServices,
    professionalServicesController
  )
);

module.exports = router;
