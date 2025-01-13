"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceTypeCategory extends Model {
    static associate(models) {}
  }

  ServiceTypeCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ServiceTypeCategory",
      timestamps: true,
    }
  );

  return ServiceTypeCategory;
};
