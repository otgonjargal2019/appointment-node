"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProfessionalServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      professionalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Professionals", key: "id" },
        onDelete: "CASCADE",
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Services", key: "id" },
        onDelete: "CASCADE",
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Organizations", key: "id" },
        onDelete: "CASCADE",
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

    await queryInterface.addIndex("ProfessionalServices", ["professionalId"]);
    await queryInterface.addIndex("ProfessionalServices", ["serviceId"]);
    await queryInterface.addIndex("ProfessionalServices", ["organizationId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("ProfessionalServices", [
      "professionalId",
    ]);
    await queryInterface.removeIndex("ProfessionalServices", ["serviceId"]);
    await queryInterface.removeIndex("ProfessionalServices", [
      "organizationId",
    ]);

    await queryInterface.dropTable("ProfessionalServices");
  },
};
