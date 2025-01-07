const { ProfessionalServices } = require("../models");

module.exports = {
  async getProfessionalServices(req, res) {
    const { professionalId } = req.params;
    try {
      const services = await ProfessionalServices.findAll({
        where: { professionalId },
      });

      if (!services) {
        return res
          .status(404)
          .json({ message: "Professional services not found." });
      }

      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching professional services:", error);
      res.status(500).json({
        message: "An error occurred while fetching professional services.",
      });
    }
  },
};
