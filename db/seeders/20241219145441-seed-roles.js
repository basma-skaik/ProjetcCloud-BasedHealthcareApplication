"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction(); // Start a transaction
    try {
      await queryInterface.bulkInsert(
        "roles",
        [
          {
            role_name: "patient",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_name: "doctor",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_name: "admin",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error seeding roles:", error);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("roles", null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error rolling back roles:", error);
      throw err;
    }
  },
};
