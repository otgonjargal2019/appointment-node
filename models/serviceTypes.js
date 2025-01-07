"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceTypes extends Model {
    static associate(models) {}
  }

  ServiceTypes.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      type: {
        type: DataTypes.ENUM(
          "barbering",
          "body",
          "counseling&holistic",
          "eyebrows&eyelashes",
          "facials&skincare",
          "fitness",
          "hair removal",
          "hair&styling",
          "injectables&fillers",
          "makeup",
          "massage",
          "medical&dental",
          "nails",
          "tattoo&piercing"
        ),
        allowNull: false,
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
