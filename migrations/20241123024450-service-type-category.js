"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ServiceTypeCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
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

    await queryInterface.bulkInsert("ServiceTypeCategories", [
      {
        name: "barbering",
        imageUrl: "assets/images/barbering.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "body",
        imageUrl: "assets/images/body.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "counseling&holistic",
        imageUrl: "assets/images/counseling&holistic.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "eyebrows&eyelashes",
        imageUrl: "assets/images/eyebrows&eyelashes.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "facials&skincare",
        imageUrl: "assets/images/fiacials&skincare.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "fitness",
        imageUrl: "assets/images/fitness.avif",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "hair removal",
        imageUrl: "assets/images/hair_removal.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "hair&styling",
        imageUrl: "assets/images/hair&styling.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "injectables&fillers",
        imageUrl: "assets/images/injectables&fillers.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "makeup",
        imageUrl: "assets/images/makeup.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "massage",
        imageUrl: "assets/images/massage.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "medical&dental",
        imageUrl: "assets/images/medical&dental.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nails",
        imageUrl: "assets/images/nails.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tattoo&piercing",
        imageUrl: "assets/images/tattoo&piercing.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ServiceTypeCategories", null, {});

    await queryInterface.dropTable("ServiceTypeCategories");
  },
};
