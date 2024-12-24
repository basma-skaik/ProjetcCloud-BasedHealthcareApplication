"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("specialties", [
      {
        specialty_name: "Cardiology",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Neurology",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Orthopedics",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Pediatrics",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Dermatology",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Oncology",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        specialty_name: "Gastroenterology",
        created_by: process.env.ADMIN_ID,
        updated_by: process.env.ADMIN_ID,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("specialties", null, {});
  },
};
