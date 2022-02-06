const { connectionString } = require("../config/db.config.js");
const { userModel } = require("../models/user.model.js");
const { roleModel } = require("../models/role.model.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(connectionString);

const testConnection = async (sequelize) => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log(connectionString);
  }
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
testConnection(db.Sequelize);

// db.user = userModel(sequelize, Sequelize);
// db.role = roleModel(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId",
// });

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
