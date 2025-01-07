"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceCategoryTranslation extends Model {
    static associate(models) {
      this.belongsTo(models.ServiceCategory, {
        foreignKey: "serviceCategoryId",
        as: "category",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceCategoryTranslation.init(
    {
      serviceCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          isIn: [["en", "mn", "fr", "es"]],
        },
      },
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
          len: [1, 500],
        },
      },
    },
    {
      sequelize,
      modelName: "ServiceCategoryTranslation",
      timestamps: true,
    }
  );

  return ServiceCategoryTranslation;
};
