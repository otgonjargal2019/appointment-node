"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      this.hasMany(models.ServiceTranslation, {
        foreignKey: "serviceId",
        as: "translations",
      });

      this.belongsTo(models.ServiceTypes, {
        foreignKey: "serviceTypeId",
        as: "serviceType",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.ServiceCategory, {
        foreignKey: "categoryId",
        as: "category",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Service, {
        foreignKey: "parentServiceId",
        as: "parentService",
        onDelete: "CASCADE",
      });
    }
  }

  Service.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentServiceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      serviceTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500],
        },
        defaultValue: "",
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 720,
          isInt: true,
        },
      },
      priceType: {
        type: DataTypes.ENUM("Free", "From", "Fixed"),
        allowNull: false,
        defaultValue: "Fixed",
      },
      price: {
        type: DataTypes.DECIMAL(15),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true,
      indexes: [
        {
          fields: ["serviceTypeId"],
        },
        {
          fields: ["businessId"],
        },
        { fields: ["parentServiceId"] },
      ],
    }
  );

  return Service;
};
