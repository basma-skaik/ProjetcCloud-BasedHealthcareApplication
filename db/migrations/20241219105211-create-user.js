"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: "username",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        field: "email",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "password",
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
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
        field: "last_login",
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "role_id",
        references: {
          model: "roles",
          key: "role_id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
