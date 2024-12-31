const { SpecialistServices } = require("../models");

module.exports = {
  async getSpecialistServices(req, res) {
    const { specialistId } = req.params;
    try {
      const services = await SpecialistServices.findAll({
        where: { specialistId },
      });

      if (!services) {
        return res
          .status(404)
          .json({ message: "Specialist services not found." });
      }
      console.log("servicesuud ::::", services);
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching specialist services:", error);
      res.status(500).json({
        message: "An error occurred while fetching specialist services.",
      });
    }
  },
};
