"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceCategory extends Model {
    static associate(models) {
      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });

      this.hasMany(models.ServiceCategoryTranslation, {
        foreignKey: "serviceCategoryId",
        as: "translations",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceCategory.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "ServiceCategory",
      timestamps: true,
    }
  );

  return ServiceCategory;
};
