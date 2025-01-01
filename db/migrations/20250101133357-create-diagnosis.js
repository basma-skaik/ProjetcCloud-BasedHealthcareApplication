"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("diagnoses", {
      diagnosisId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: "diagnosis_id",
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "patient_id",
        },
        field: "patient_id",
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "doctors",
          key: "doctor_id",
        },
        field: "doctor_id",
      },
      diagnosis: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "diagnosis",
      },
      treatment: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "treatment",
      },
      prescription: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: "prescription",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Diagnoses");
  },
};
