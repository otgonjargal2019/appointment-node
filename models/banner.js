"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }

  Banner.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
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
