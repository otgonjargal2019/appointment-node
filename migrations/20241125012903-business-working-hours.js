"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BusinessWorkingHours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Businesses",
          key: "id",
        },
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
    await queryInterface.addIndex("BusinessWorkingHours", ["businessId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("BusinessWorkingHours", ["businessId"]);
    await queryInterface.dropTable("BusinessWorkingHours");
  },
};
