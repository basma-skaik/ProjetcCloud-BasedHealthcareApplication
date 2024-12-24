const config = require("../../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
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

db.ROLES = ["patient", "doctor", "admin"];

module.exports = db;
