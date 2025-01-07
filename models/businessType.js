"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BusinessType extends Model {
    static associate(models) {
      this.hasMany(models.Business, {
        foreignKey: "businessTypeId",
        as: "businesses",
      });
    }
  }

  BusinessType.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "BusinessType",
    }
  );

  return BusinessType;
};
