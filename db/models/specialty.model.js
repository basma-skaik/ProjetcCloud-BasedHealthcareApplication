"use strict";
module.exports = (sequelize, Sequelize) => {
  const Specialty = sequelize.define("specialties", {
    specialtyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "specialty_id",
    },
    specialtyName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "specialty_name",
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

  return Specialty;
};
