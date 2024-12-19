"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      this.belongsTo(models.ServiceCategory, {
        foreignKey: "serviceCategoryId",
        as: "serviceCategory",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });
    }
  }

  Service.init(
    {
      serviceCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "ServiceCategories", key: "id" },
        onDelete: "CASCADE",
      },
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
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true,
      //paranoid: true,
      indexes: [
        {
          fields: ["serviceCategoryId"],
        },
        {
          fields: ["organizationId"],
        },
      ],
    }
  );

  return Service;
};
