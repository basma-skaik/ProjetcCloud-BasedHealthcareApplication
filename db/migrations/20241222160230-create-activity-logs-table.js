"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_logs", {
      logId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "log_id",
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
      activityType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "activity_type",
      },
      activityDetails: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "activity_details",
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
    await queryInterface.dropTable("activity_logs");
  },
};
