"use strict";
module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctors", {
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
      allowNull: true,
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

  return Doctor;
};
