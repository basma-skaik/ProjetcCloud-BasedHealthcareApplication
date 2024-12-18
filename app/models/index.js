const config = require("../config/db.config");

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

db.User = require("../models/user.model")(sequelize, Sequelize);
db.Role = require("../models/role.model")(sequelize, Sequelize);

db.User.belongsTo(db.Role, {
  foreignKey: "roleId",
  as: "role",
});

db.Role.hasMany(db.User, {
  foreignKey: "roleId",
  as: "users",
});

db.ROLES = ["patient", "doctor", "admin"];

module.exports = db;
