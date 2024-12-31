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
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
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
      isPriceFixed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      minPrice: { type: Sequelize.BIGINT, allowNull: true },
      maxPrice: { type: Sequelize.BIGINT, allowNull: true },
      isDurationFixed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      minDuration: { type: Sequelize.INTEGER, allowNull: true },
      maxDuration: { type: Sequelize.INTEGER, allowNull: true },
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
    await queryInterface.addIndex("Services", ["organizationId"]);
    await queryInterface.addIndex("Services", ["parentServiceId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Services", ["serviceTypeId"]);
    await queryInterface.removeIndex("Services", ["organizationId"]);
    await queryInterface.removeIndex("Services", ["parentServiceId"]);

    await queryInterface.dropTable("Services");
  },
};
