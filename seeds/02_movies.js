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
      let insertArray = [];
      for (let i = 1; i <= 10; i++) {
        insertArray.push({
          id: i,
          title: `Movie${i}`,
          tmdb_id: `1234567`,
          poster_path: `/test`,
          user_id: Math.floor(Math.random() * 10 + 1), // Random user between ID 1 and 10
          seen: i % 2,
          rating: Math.floor(Math.random() * 5 + 1),
        });
      }
      // Inserts seed entries
      return knex("movies").insert(insertArray);
    });
};
