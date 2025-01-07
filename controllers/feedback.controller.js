const { sequelize, Feedback } = require("../models");

async function getAverageRatingForBusiness(businessId) {
  try {
    const result = await Feedback.findAll({
      where: { businessId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
      ],
    });

    if (result[0].dataValues.averageRating) {
      return parseFloat(result[0].dataValues.averageRating.toFixed(1));
    }

    return null;
  } catch (error) {
    console.error("Error fetching average rating:", error);
    throw error;
  }
}

async function getUserRatingForBusiness(businessId, userId) {
  try {
    const feedback = await Feedback.findOne({
      where: { businessId, userId },
      attributes: ["rating"],
    });

    if (feedback) {
      return feedback.rating;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user rating:", error);
    throw error;
  }
}

module.exports = {
  getAverageRatingForBusiness,
  getUserRatingForBusiness,
};
