"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Professional extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Rank, {
        foreignKey: "rankId",
        as: "rank",
        onDelete: "SET NULL",
      });
    }
  }

  Professional.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Unspecified",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Professional",
    }
  );

  return Professional;
};
