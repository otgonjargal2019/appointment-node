"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpecialistWorkingHours extends Model {
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Specialist, {
        foreignKey: "specialistId",
        as: "specialist",
        onDelete: "CASCADE",
      });
    }
  }

  SpecialistWorkingHours.init(
    {
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
      },
      specialistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Specialists", key: "id" },
        onDelete: "CASCADE",
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
      modelName: "SpecialistWorkingHours",
      timestamps: true,
    }
  );

  return SpecialistWorkingHours;
};
