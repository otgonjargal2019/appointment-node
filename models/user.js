"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.SocialAuth, {
        foreignKey: "userId",
        as: "socials",
      });
    }

    async hashPassword() {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(this.password, saltRounds);
      console.log("hashPassword::", hashPassword);
      this.password = hashPassword;
    }
  }
  User.init(
    {
      phoneNumber: { type: DataTypes.STRING, unique: true },
      username: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          await user.hashPassword();
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            await user.hashPassword();
          }
        },
      },
    }
  );
  return User;
};
