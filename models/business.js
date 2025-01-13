"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      this.hasMany(models.Rank, {
        foreignKey: "businessId",
        as: "ranks",
        onDelete: "CASCADE",
      });

      this.hasMany(models.BusinessWorkingHours, {
        foreignKey: "businessId",
        as: "workingHours",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Professional, {
        foreignKey: "businessId",
        as: "professionals",
        onDelete: "CASCADE",
      });
    }
  }

  Business.init(
    {
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
      modelName: "Business",
    }
  );

  return Business;
};
