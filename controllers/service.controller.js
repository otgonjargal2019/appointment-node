const { ServiceCategory, Service } = require("../models");

async function getServiceCategoriesWithServicesForOrganization(organizationId) {
  try {
    const categories = await ServiceCategory.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Service,
          as: "services",
          attributes: [
            "serviceCategoryId",
            "name",
            "description",
            "price",
            "duration",
          ],
          where: { organizationId },
          required: true,
        },
      ],
    });

    return categories;
  } catch (error) {
    console.error("Error fetching service categories with services:", error);
    throw error;
  }
}

async function getServicesOfOrganization(organizationId) {
  try {
    const list = await Service.findAll({
      where: { organizationId },
    });

    return list;
  } catch (error) {
    console.error("Error fetching services of organization:", error);
    throw error;
  }
}

module.exports = {
  getServicesOfOrganization,
  getServiceCategoriesWithServicesForOrganization,
};
