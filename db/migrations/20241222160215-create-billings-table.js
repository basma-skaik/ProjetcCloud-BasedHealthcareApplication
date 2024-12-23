"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("billings", {
      billingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "billing_id",
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
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "amount",
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending",
        field: "status",
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
    await queryInterface.dropTable("billings");
  },
};
