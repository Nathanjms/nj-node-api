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
        let userId = Math.floor(Math.random() * 10 + 1);
        insertArray.push({
          id: i,
          title: `Movie${i}`,
          tmdb_id: `1234567`,
          poster_path: `/test`,
          user_id: i <= 5 ? userId : null, // First half assigned to user
          group_id: i <= 5 ? null : 1, // Second half assigned to group
          seen: i % 2,
          created_by: i <= 5 ? userId : 1,
          rating: Math.floor(Math.random() * 5 + 1),
        });
      }

      // Inserts seed entries
      return knex("movies").insert(insertArray);
    });
};