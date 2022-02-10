const { pg } = require("../config/db.config");

const table = "users";

const selectColumns = ["name", "email", "id", "password"];

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

exports.getUserFromEmail = async (email) => {
  return await pg(table)
    .select(selectColumns)
    .from("users")
    .where("email", email)
    .first();
};

exports.getUserFromId = async (id) => {
  return await pg(table)
    .select(selectColumns)
    .from("users")
    .where("id", id)
    .first();
};
