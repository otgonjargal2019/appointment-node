"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceTranslation extends Model {
    static associate(models) {
      this.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceTranslation.init(
    {
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ServiceTranslation",
      timestamps: true,
    }
  );

  return ServiceTranslation;
};
