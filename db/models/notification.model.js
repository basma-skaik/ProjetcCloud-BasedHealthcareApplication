"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      notificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "notification_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "message",
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_read",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "created_by",
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "updated_by",
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "deleted_by",
      },
    },
    {
      tableName: "notifications",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Notification;
};
