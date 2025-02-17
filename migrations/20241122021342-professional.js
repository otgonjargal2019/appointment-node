"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Professionals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      rankId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Ranks",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: { type: Sequelize.STRING, allowNull: false },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Unspecified",
      },
      imageUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Professionals");
  },
};
