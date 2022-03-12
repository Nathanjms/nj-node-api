/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function () {
      // Build array of entries
      let insertArray = require("../app/config/movies.example.json");
      for (let i = 11; i <= 20; i++) {
        let seen = i % 2; // 50% chance of marking as seen
        insertArray.push({
          title: `Movie ${i}`,
          tmdb_id: ``,
          poster_path: ``,
          group_id: 1,
          seen: seen,
          created_by: 1,
          rating: seen ? Math.floor(Math.random() * 5 + 1) : null,
        });
      }

      // Inserts seed entries
      return knex("movies").insert(insertArray);
    });
};
