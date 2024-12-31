const { Organization, OrganizationType } = require("../models");
const { Op } = require("sequelize");
const { getAverageRatingForOrganization } = require("./feedback.controller");
const { getClosingTime } = require("./organizationWoorkingHours.controller");
const { getLikeCountForOrganization } = require("./like.controller");
const {
  getServicesOfOrganization,
  getServiceCategoriesWithServicesForOrganization,
} = require("./service.controller");

const toRadians = (degrees) => degrees * (Math.PI / 180);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

module.exports = {
  async getBusinessTypes(req, res) {
    const organizationTypes = await OrganizationType.findAll();
    return res.status(200).json(organizationTypes);
  },

  async getAllOrganizations(req, res) {
    const list = await Organization.findAll();
    return res.status(200).json(list);
  },

  async getNewlyJoinedOrganizations(req, res) {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const now = new Date();

    const list = await Organization.findAll({
      where: {
        createdAt: {
          [Op.between]: [tenDaysAgo, now],
        },
      },
      include: [
        {
          model: OrganizationType,
          as: "organizationType",
          required: false,
        },
      ],
    });

    return res.status(200).json(list);
  },

  async getNearbyOrganizations(req, res) {
    const { latitude, longitude, radius = 10 } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required." });
    }

    const allOrganizations = await Organization.findAll();

    const nearbyOrganizations = allOrganizations.filter((org) => {
      if (org.latitude && org.longitude) {
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(org.latitude),
          parseFloat(org.longitude)
        );
        return distance <= radius;
      }
      return false;
    });

    return res.status(200).json(nearbyOrganizations);
  },

  async getOrganizationDetail(req, res) {
    try {
      const organizationId = req.params.organizationId;

      const averageRating = await getAverageRatingForOrganization(
        organizationId
      );

      const closingTime = await getClosingTime(organizationId);
      const likeCount = await getLikeCountForOrganization(organizationId);
      const services = await getServicesOfOrganization(organizationId);
      const serviceCategory =
        await getServiceCategoriesWithServicesForOrganization(organizationId);

      return res.json({
        averageRating,
        closingTime,
        likeCount,
        services,
        serviceCategory,
      });
    } catch (error) {
      console.error("Error in getOrganizationDetail:", error);
      return res.status(500).json({ error: "An error occurred." });
    }
  },
};
