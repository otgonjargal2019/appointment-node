"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BusinessWorkingHours extends Model {
    static associate(models) {
      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });
    }
  }

  BusinessWorkingHours.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
            ],
            msg: "dayOfWeek must be a valid day of the week.",
          },
        },
      },
      openingTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      closingTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterOpening(value) {
            if (this.openingTime && value <= this.openingTime) {
              throw new Error("closingTime must be after openingTime.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BusinessWorkingHours",
      timestamps: true,
    }
  );

  return BusinessWorkingHours;
};
