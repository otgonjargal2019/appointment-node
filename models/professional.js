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

      this.belongsTo(models.Organization, {
        foreignKey: "organizationId",
        as: "organization",
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
        references: { model: "Users", key: "id" },
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
      },
      rankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Ranks", key: "id" },
        onDelete: "SET NULL",
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
      // phoneNumber: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   validate: {
      //     is: /^[0-9\-+() ]*$/,
      //   },
      // },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   validate: {
      //     isEmail: true,
      //   },
      // },
    },
    {
      sequelize,
      modelName: "Professional",
    }
  );

  return Professional;
};
