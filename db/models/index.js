const config = require("../../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect || "mysql",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.min,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Role = require("./role.model")(sequelize, Sequelize);
db.Doctor = require("./doctor.model")(sequelize, Sequelize);
db.Patient = require("./patient.model")(sequelize, Sequelize);
db.Specialty = require("./specialty.model")(sequelize, Sequelize);
db.Appointment = require("./appointment.model")(sequelize, Sequelize);
db.Notification = require("./notification.model")(sequelize, Sequelize);
db.Diagnosis = require("./diagnosis.model")(sequelize, Sequelize);
db.MedicalAdvice = require("./medical-advice.model")(sequelize, Sequelize);

// Establish relationships

// User → Role (1:1)
db.User.belongsTo(db.Role, {
  foreignKey: "roleId",
  as: "role",
});
db.Role.hasMany(db.User, {
  foreignKey: "roleId",
  as: "users",
});

// User → Patient (1:1)
db.Patient.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});
db.User.hasOne(db.Patient, {
  foreignKey: "userId",
  as: "patient",
});

// User → Doctor (1:1)
db.Doctor.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});
db.User.hasOne(db.Doctor, {
  foreignKey: "userId",
  as: "doctor",
});

// Doctor → Specialty (1:1)
db.Doctor.belongsTo(db.Specialty, {
  foreignKey: "specialtyId",
  as: "specialty",
});
db.Specialty.hasMany(db.Doctor, {
  foreignKey: "specialtyId",
  as: "doctors",
});

// Patient → Appointment (1:M)
db.Patient.hasMany(db.Appointment, {
  foreignKey: "patientId",
  as: "appointments",
});
db.Appointment.belongsTo(db.Patient, {
  foreignKey: "patientId",
  as: "patient",
});

// Doctor → Appointment (1:M)
db.Doctor.hasMany(db.Appointment, {
  foreignKey: "doctorId",
  as: "appointments",
});
db.Appointment.belongsTo(db.Doctor, {
  foreignKey: "doctorId",
  as: "doctor",
});

// User → Notification (1:M)
db.User.hasMany(db.Notification, {
  foreignKey: "userId",
  as: "notifications",
});
db.Notification.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

// Patient → Diagnosis (1:M )
db.Diagnosis.belongsTo(db.Patient, {
  foreignKey: "patient_id",
  as: "patient",
});
db.Patient.hasMany(db.Diagnosis, {
  foreignKey: "patient_id",
  as: "diagnoses",
});

// Doctor → Diagnosis (1:M )
db.Diagnosis.belongsTo(db.Doctor, {
  foreignKey: "doctor_id",
  as: "doctor",
});
db.Doctor.hasMany(db.Diagnosis, {
  foreignKey: "doctor_id",
  as: "diagnoses",
});
module.exports = db;
