const { pg } = require("../config/db.config");

const table = "users";

const columnWhitelist = ["id", "name", "email", "password"];
const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

const isNotDeleted = (queryBuilder, columnName = "deleted_at") => {
  queryBuilder.where(columnName, null);
};

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
    user = user.modify(isNotDeleted);
  }

  return await user.first();
};

exports.getUserFromId = async (id, includeDeleted = false) => {
  let user = pg(table).select(selectColumns).from("users").where("id", id);

  if (!includeDeleted) {
    user = user.modify(isNotDeleted);
  }

  return await user.first();
};
