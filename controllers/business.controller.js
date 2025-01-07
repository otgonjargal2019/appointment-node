const { Business, BusinessType } = require("../models");
const { Op } = require("sequelize");
//const { getAverageRatingForOrganization } = require("./feedback.controller");
const { getClosingTime } = require("./businessWorkingHours.controller");
const { getLikeCountForBusiness } = require("./like.controller");
const {
  getServicesOfBusiness,
  getServiceTypesWithServices,
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
    const businessTypes = await BusinessType.findAll();
    return res.status(200).json(businessTypes);
  },

  async getAllBusinesses(req, res) {
    const list = await Business.findAll();
    return res.status(200).json(list);
  },

  async getNewlyJoinedBusinesses(req, res) {
    const tenDaysAgo = new Date();
    // tenDaysAgo.setDate(tenDaysAgo.getDate() - 10); original code shu dood mur 30 udruur bgaa shu
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 30);
    const now = new Date();

    const list = await Business.findAll({
      where: {
        createdAt: {
          [Op.between]: [tenDaysAgo, now],
        },
      },
      include: [
        {
          model: BusinessType,
          as: "businessType",
          required: false,
        },
      ],
    });

    return res.status(200).json(list);
  },

  async getNearbyBusinesses(req, res) {
    const { latitude, longitude, radius = 10 } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required." });
    }

    const allBusinesses = await Business.findAll();

    const nearbyBusinesses = allBusinesses.filter((org) => {
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

    return res.status(200).json(nearbyBusinesses);
  },

  async getBusinessDetail(req, res) {
    try {
      const businessId = req.params.businessId;

      const averageRating = await getAverageRatingForBusiness(businessId);

      const closingTime = await getClosingTime(businessId);
      const likeCount = await getLikeCountForBusiness(businessId);
      const services = await getServicesOfBusiness(businessId);
      const serviceCategory = await getServiceTypesWithServices(businessId);

      return res.json({
        averageRating,
        closingTime,
        likeCount,
        services,
        serviceCategory,
      });
    } catch (error) {
      console.error("Error in getBusinessDetail:", error);
      return res.status(500).json({ error: "An error occurred." });
    }
  },
};
