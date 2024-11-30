"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      this.belongsTo(models.OrganizationType, {
        foreignKey: "organizationTypeId",
        as: "organizationType",
      });

      this.hasMany(models.Rank, {
        foreignKey: "organizationId",
        as: "ranks",
        onDelete: "CASCADE",
      });
    }
  }

  Organization.init(
    {
      organizationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "OrganizationTypes", key: "id" },
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        validate: {
          min: -90,
          max: 90,
        },
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        validate: {
          min: -180,
          max: 180,
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Organization",
    }
  );

  return Organization;
};
