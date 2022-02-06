const { connectionString } = require("../config/db.config.js");
const { userModel } = require("../models/user.model.js");
const { roleModel } = require("../models/role.model.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(connectionString);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
