const { pg } = require("../config/db.config");

const table = "users";

const selectColumns = ["id", "name", "email", "password"];

exports.insertUser = async (name, email, password) => {
  await pg(table)
    .insert({
      name: name,
      email: email,
      password: password,
    })
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.getUserFromEmail = async (email, includeDeleted = false) => {
  let user = pg(table)
    .select(selectColumns)
    .from("users")
    .where("email", email);

  if (!includeDeleted) {
    user = user.where("deleted_at", null);
  }

  return await user.first();
};

exports.getUserFromId = async (id, includeDeleted = false) => {
  let user = pg(table).select(selectColumns).from("users").where("id", id);

  if (!includeDeleted) {
    user = user.where("deleted_at", null);
  }

  return await user.first();
};
