"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SocialAuth extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  SocialAuth.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "SocialAuth",
      indexes: [
        {
          unique: true,
          fields: ["provider", "providerId"],
        },
      ],
    }
  );

  return SocialAuth;
};
