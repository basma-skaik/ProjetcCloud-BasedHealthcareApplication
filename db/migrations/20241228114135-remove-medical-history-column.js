"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("patients", "medical_history");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("patients", "medical_history", {
      type: Sequelize.TEXT,
      allowNull: true,
      field: "medical_history",
    });
  },
};
