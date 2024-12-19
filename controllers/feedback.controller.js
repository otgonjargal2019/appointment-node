const { sequelize, Feedback } = require("../models");

async function getAverageRatingForOrganization(organizationId) {
  try {
    const result = await Feedback.findAll({
      where: { organizationId },
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

async function getUserRatingForOrganization(organizationId, userId) {
  try {
    const feedback = await Feedback.findOne({
      where: { organizationId, userId },
      attributes: ["rating"],
    });

    if (feedback) {
      return feedback.rating;
    }

    return null; // If the user hasn't left a rating, return null
  } catch (error) {
    console.error("Error fetching user rating:", error);
    throw error;
  }
}

module.exports = {
  getAverageRatingForOrganization,
  getUserRatingForOrganization,
};
