const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  try {
    await knex("user_movie_groups").del();
    let insertArray = buildDataArray();
    await knex("user_movie_groups").insert(insertArray);
    await knex("users_movie_groups_link").truncate();
    await knex("users_movie_groups_link").insert({
      user_id: 1,
      group_id: 1,
    });
  } catch (error) {
    throw error;
  }
};

const buildDataArray = () => {
  let insertArray = [];
  for (let i = 1; i <= 10; i++) {
    insertArray.push({
      name: `Group ${i}`,
      password: bcrypt.hashSync("123456", 8),
    });
  }
  return insertArray;
};
