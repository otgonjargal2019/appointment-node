"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      this.belongsTo(models.ServiceTypes, {
        foreignKey: "serviceTypeId",
        as: "serviceType",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Service, {
        foreignKey: "parentServiceId",
        as: "parentService",
        onDelete: "CASCADE",
      });
    }
  }

  Service.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
      },
      parentServiceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Services", key: "id" },
        onDelete: "CASCADE",
      },
      serviceTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "ServiceTypes", key: "id" },
        onDelete: "CASCADE",
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      isPriceFixed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      minPrice: { type: DataTypes.BIGINT, allowNull: true },
      maxPrice: { type: DataTypes.BIGINT, allowNull: true },
      isDurationFixed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      minDuration: { type: DataTypes.INTEGER, allowNull: true },
      maxDuration: { type: DataTypes.INTEGER, allowNull: true },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true,
      indexes: [
        {
          fields: ["serviceTypeId"],
        },
        {
          fields: ["organizationId"],
        },
        { fields: ["parentServiceId"] },
      ],
    }
  );

  return Service;
};
