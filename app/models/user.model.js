const { pg } = require("../config/db.config");

const table = "users";

const columnWhitelist = ["id", "name", "email", "password"];
const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

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
  return await pg(table)
    .select(selectColumns)
    .from("users")
    .where("email", email)
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    })
    .first();
};

exports.getUserFromId = async (id, includeDeleted = false) => {
  return await pg(table)
    .select(selectColumns)
    .from("users")
    .where("id", id)
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    })
    .first();
};
