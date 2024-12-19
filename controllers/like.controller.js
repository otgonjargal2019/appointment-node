const { Like } = require("../models");

async function getLikeCountForOrganization(organizationId) {
  try {
    const likeCount = await Like.count({
      where: { organizationId },
      isLiked: true,
    });

    return likeCount;
  } catch (error) {
    console.error("Error fetching like count:", error);
    throw error;
  }
}

module.exports = { getLikeCountForOrganization };
