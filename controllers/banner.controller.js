const { Banner } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async getMain(req, res) {
    const currentDate = new Date();
    const tenDaysFromToday = new Date();
    tenDaysFromToday.setDate(currentDate.getDate() - 10);

    const banners = await Banner.findAll({
      where: {
        isActive: true,
        bannerType: "main",
        startDate: {
          [Op.lte]: currentDate,
          [Op.gte]: tenDaysFromToday,
        },
        endDate: {
          [Op.gte]: currentDate,
          // [Op.lte]: tenDaysFromToday,
        },
      },
    });
    return res.status(200).json(banners);
  },

  async getTrending(req, res) {
    const currentDate = new Date();
    const tenDaysFromToday = new Date();
    tenDaysFromToday.setDate(currentDate.getDate() + 10);

    const banners = await Banner.findAll({
      where: {
        isActive: true,
        bannerType: "trending",
        startDate: {
          [Op.lte]: currentDate,
        },
        endDate: {
          [Op.gte]: currentDate,
          [Op.lte]: tenDaysFromToday,
        },
      },
    });
    return res.status(200).json(banners);
  },
};
