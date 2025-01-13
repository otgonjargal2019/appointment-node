"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceTypes extends Model {
    static associate(models) {
      this.belongsTo(models.ServiceTypeCategory, {
        foreignKey: "categoryId",
        as: "category",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceTypes.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ServiceTypes",
      timestamps: true,
    }
  );

  return ServiceTypes;
};
