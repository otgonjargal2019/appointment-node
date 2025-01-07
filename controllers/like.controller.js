const { Like } = require("../models");

async function getLikeCountForBusiness(businessId) {
  try {
    const likeCount = await Like.count({
      where: { businessId },
      isLiked: true,
    });

    return likeCount;
  } catch (error) {
    console.error("Error fetching like count:", error);
    throw error;
  }
}

module.exports = { getLikeCountForBusiness };
