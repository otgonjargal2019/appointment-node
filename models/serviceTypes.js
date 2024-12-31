"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceTypes extends Model {
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }

  ServiceTypes.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
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
          len: [0, 500],
        },
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
