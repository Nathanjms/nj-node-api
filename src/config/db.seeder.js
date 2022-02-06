/* DB & Model */
const db = require("../models");

const forceDB = Boolean(process?.env?.npm_config_force_db);

const Role = db.role;

const initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
};

db.sequelize.sync({ force: forceDB }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});
