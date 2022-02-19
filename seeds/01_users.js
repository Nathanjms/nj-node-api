const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Build array of entries
      let insertArray = [];
      for (let i = 1; i <= 10; i++) {
        insertArray.push({
          email: `nj${i}@test.com`,
          password: bcrypt.hashSync("123456", 8),
          name: `NJ${i}`,
        });
      }
      return knex("users").insert(insertArray);
    });
};
