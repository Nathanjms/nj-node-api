const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_groups")
    .del()
    .then(function () {
      // Build array of entries
      let insertArray = [];
      for (let i = 1; i <= 10; i++) {
        insertArray.push({
          id: i,
          name: `Group ${i}`,
        });
      }
      return knex("user_groups")
        .insert(insertArray)
        .then(() => {
          return knex("users_groups").insert({
            id: 1,
            user_id: 1,
            group_id: 1,
          });
        });
    });
};
