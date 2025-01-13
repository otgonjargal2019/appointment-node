const { ServiceTypes, Service, ServiceTypeCategory } = require("../models");

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

async function getServiceTypeCategories(req, res) {
  try {
    const list = await ServiceTypeCategory.findAll({
      attributes: ["id", "name", "imageUrl"],
    });

    return res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching services of organization:", error);
    throw error;
  }
}

module.exports = {
  getServicesOfBusiness,
  getServiceTypesWithServices,
  getServiceTypeCategories,
};
