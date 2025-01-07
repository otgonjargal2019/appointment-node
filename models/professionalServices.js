"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProfessionalServices extends Model {
    static associate(models) {
      this.belongsTo(models.Professional, {
        foreignKey: "professionalId",
        as: "professional",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });
    }
  }

  ProfessionalServices.init(
    {
      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProfessionalServices",
      timestamps: true,
      indexes: [
        {
          fields: ["professionalId"],
        },
        {
          fields: ["serviceId"],
        },
        {
          fields: ["businessId"],
        },
      ],
    }
  );

  return ProfessionalServices;
};
