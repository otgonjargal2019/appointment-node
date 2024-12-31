const { Specialist, Rank } = require("../models");
module.exports = {
  async getSpecialistsByOrganization(req, res) {
    const { organizationId } = req.params;

    try {
      if (!organizationId) {
        return res
          .status(400)
          .json({ message: "Organization ID is required." });
      }

      const specialists = await Specialist.findAll({
        where: { organizationId },
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
      //   console.log("specialists>>>>>>>>>>>>>>>>>>>>>>>>>", specialists);
      //   specialists.map((specialist) => console.log(specialist.rank));

      if (!specialists) {
        return res.status(404).json({ message: "Organization not found." });
      }

      res.status(200).json(specialists);
    } catch (error) {
      console.error("Error fetching specialists:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching specialists." });
    }
  },
};
