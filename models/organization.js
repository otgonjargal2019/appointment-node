"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      this.belongsTo(models.OrganizationType, {
        foreignKey: "organizationTypeId",
        as: "organizationType",
      });
    }
  }

  Organization.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      organizationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "OrganizationTypes", key: "id" },
      },
      address: {
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
