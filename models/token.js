"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Token.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: true,
        //   len: [10, 2048],
        // },
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   len: [10, 2048],
        // },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Token",
      indexes: [
        {
          fields: ["userId"],
        },
      ],
    }
  );

  return Token;
};
