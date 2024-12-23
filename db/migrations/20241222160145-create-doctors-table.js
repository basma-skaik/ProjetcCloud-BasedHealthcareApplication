"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("doctors", {
      doctorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "doctor_id",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        field: "user_id",
      },
      uniqueDoctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: "unique_doctor_id",
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "specialties",
          key: "specialty_id",
        },
        field: "specialty_id",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: "deleted_at",
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "created_by",
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "updated_by",
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "deleted_by",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("doctors");
  },
};
