"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceCategory extends Model {
    static associate(models) {
      this.hasMany(models.Service, {
        foreignKey: "serviceCategoryId",
        as: "services",
      });
    }
  }

  ServiceCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500],
        },
      },
    },
    {
      sequelize,
      modelName: "ServiceCategory",
      timestamps: true,
    }
  );

  return ServiceCategory;
};
