"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SpecialistWorkingHours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Organizations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      specialistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Specialists", key: "id" },
        onDelete: "CASCADE",
      },
      dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      openingTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      closingTime: {
        type: Sequelize.TIME,
        allowNull: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SpecialistWorkingHours");
  },
};
