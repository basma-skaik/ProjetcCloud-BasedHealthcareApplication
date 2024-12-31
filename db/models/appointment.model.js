"use strict";

module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    appointmentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "appointment_id",
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
    appointmentDate: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "appointment_date",
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

  return Appointment;
};
