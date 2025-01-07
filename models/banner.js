"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });
    }
  }

  Banner.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bannerType: {
        type: DataTypes.ENUM("main", "trending"),
        allowNull: false,
      },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Banner",
    }
  );

  return Banner;
};
