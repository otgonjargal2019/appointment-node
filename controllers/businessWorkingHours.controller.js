const { BusinessWorkingHours } = require("../models");

async function getClosingTime(businessId) {
  try {
    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });

    const result = await BusinessWorkingHours.findOne({
      where: { businessId, dayOfWeek },
      attributes: ["closingTime"],
    });
    if (!result) {
      return `No closing time found for ${dayOfWeek}.`;
    }

    return result?.closingTime ?? "N/A";
  } catch (error) {
    console.error("Error fetching org closing time:", error);
    throw error;
  }
}

module.exports = {
  getClosingTime,
};
