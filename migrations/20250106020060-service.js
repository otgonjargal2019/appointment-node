"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Businesses", key: "id" },
        onDelete: "CASCADE",
      },
      parentServiceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Services", key: "id" },
        onDelete: "CASCADE",
      },
      serviceTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ServiceTypes", key: "id" },
        onDelete: "CASCADE",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ServiceCategories", key: "id" },
        onDelete: "CASCADE",
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      priceType: {
        type: Sequelize.ENUM("Free", "From", "Fixed"),
        allowNull: true,
        // defaultValue: "Fixed",
      },
      price: {
        type: Sequelize.DECIMAL(15),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("Services", ["serviceTypeId"]);
    await queryInterface.addIndex("Services", ["businessId"]);
    await queryInterface.addIndex("Services", ["parentServiceId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Services", ["serviceTypeId"]);
    await queryInterface.removeIndex("Services", ["businessId"]);
    await queryInterface.removeIndex("Services", ["parentServiceId"]);

    await queryInterface.dropTable("Services");
  },
};
