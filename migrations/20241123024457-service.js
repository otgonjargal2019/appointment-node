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
      serviceCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ServiceCategories", key: "id" },
        onDelete: "CASCADE",
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
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

    await queryInterface.addIndex("Services", ["serviceCategoryId"]);
    await queryInterface.addIndex("Services", ["organizationId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Services", ["serviceCategoryId"]);
    await queryInterface.removeIndex("Services", ["organizationId"]);

    await queryInterface.dropTable("Services");
  },
};
