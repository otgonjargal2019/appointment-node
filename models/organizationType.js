"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrganizationType extends Model {
    static associate(models) {
      this.hasMany(models.Organization, {
        foreignKey: "organizationTypeId",
        as: "organizations",
      });
    }
  }

  OrganizationType.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "OrganizationType",
    }
  );

  return OrganizationType;
};
