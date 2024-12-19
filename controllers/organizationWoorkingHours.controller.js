const { OrganizationWorkingHours } = require("../models");

async function getClosingTime(organizationId) {
  try {
    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });

    const result = await OrganizationWorkingHours.findOne({
      where: { organizationId, dayOfWeek },
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
