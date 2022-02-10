const { pg } = require("../config/db.config");

const table = "users";

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
    .select(["name", "email", "id", "password"])
    .from("users")
    .where("email", email)
    .first();
};
