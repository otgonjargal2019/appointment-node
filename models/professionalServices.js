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

      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }

  ProfessionalServices.init(
    {
      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Professionals", key: "id" },
        onDelete: "CASCADE",
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Services", key: "id" },
        onDelete: "CASCADE",
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
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
          fields: ["organizationId"],
        },
      ],
    }
  );

  return ProfessionalServices;
};
