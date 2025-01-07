"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProfessionalWorkingHours extends Model {
    static associate(models) {
      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Professional, {
        foreignKey: "professionalId",
        as: "specialist",
        onDelete: "CASCADE",
      });
    }
  }

  ProfessionalWorkingHours.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      professionalId: {
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
      modelName: "ProfessionalWorkingHours",
      timestamps: true,
    }
  );

  return ProfessionalWorkingHours;
};
