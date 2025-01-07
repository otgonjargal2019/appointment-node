const { Professional, Rank } = require("../models");
module.exports = {
  async getProfessionalsByBusiness(req, res) {
    const { businessId } = req.params;

    try {
      if (!businessId) {
        return res.status(400).json({ message: "Business ID is required." });
      }

      const professionals = await Professional.findAll({
        where: { businessId },
        attributes: [
          "id",
          "firstname",
          "lastname",
          "position",
          "imageUrl",
          "phoneNumber",
          "email",
        ],
        include: [{ model: Rank, as: "rank", attributes: ["name"] }],
      });

      if (!professionals) {
        return res.status(404).json({ message: "Business not found." });
      }

      res.status(200).json(professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching professionals." });
    }
  },
};
