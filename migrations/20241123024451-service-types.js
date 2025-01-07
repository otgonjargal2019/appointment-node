"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ServiceTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          "barbering",
          "body",
          "counseling&holistic",
          "eyebrows&eyelashes",
          "facials&skincare",
          "fitness",
          "hair removal",
          "hair&styling",
          "injectables&fillers",
          "makeup",
          "massage",
          "medical&dental",
          "nails",
          "tattoo&piercing"
        ),
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
    await queryInterface.dropTable("ServiceTypes");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_ServiceTypes_type";'
    );
  },
};
