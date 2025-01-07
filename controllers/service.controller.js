const { ServiceTypes, Service } = require("../models");

async function getServiceTypesWithServices(businessId) {
  try {
    const types = await ServiceTypes.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Service,
          as: "services",
          attributes: [
            "serviceTypeId",
            "name",
            "description",
            "price",
            "duration",
          ],
          where: { businessId },
          required: true,
        },
      ],
    });
    console.log("categories::::::", types);

    return types;
  } catch (error) {
    console.error("Error fetching service categories with services:", error);
    throw error;
  }
}

async function getServicesOfBusiness(businessId) {
  try {
    const list = await Service.findAll({
      where: { businessId },
    });

    return list;
  } catch (error) {
    console.error("Error fetching services of organization:", error);
    throw error;
  }
}

module.exports = {
  getServicesOfBusiness,
  getServiceTypesWithServices,
};
