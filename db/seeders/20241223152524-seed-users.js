"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Hash the password before inserting
      const hashedPassword = bcrypt.hashSync("admin123", 10);

      await queryInterface.bulkInsert(
        "users",
        [
          {
            user_id: 1,
            username: "basmaAdmin",
            email: "basmahskaik@gmail.com",
            password: hashedPassword, // Store the hashed password
            is_verified: 1,
            registration_status: "approved",
            role_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error seeding users:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete(
        "users",
        { username: "basmaAdmin" },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error rolling back roles:", error);
      throw error;
    }
  },
};
