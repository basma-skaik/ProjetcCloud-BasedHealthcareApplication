"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("doctors", "specialty_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // Make it nullable
      references: {
        model: "specialties",
        key: "specialty_id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("doctors", "specialty_id", {
      type: Sequelize.INTEGER,
      allowNull: false, // Revert back to non-nullable
      references: {
        model: "specialties",
        key: "specialty_id",
      },
    });
  },
};
