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
      let movies = require("../app/config/movies.example.json");
      let insertArray = [];
      movies.forEach((movie) => {
        insertArray.push({
          title: movie.title,
          tmdb_id: movie.tmdb_id,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          group_id: movie.group_id,
          seen: movie.seen,
          created_by: movie.created_by,
          rating: movie.rating,
          seen_at: movie.seen ? "NOW()" : null //TODO: Add this into the json instead to make the dates different
        })
      })
      for (let i = 11; i <= 20; i++) {
        let seen = i % 2; // 50% chance of marking as seen
        // Seed fake movies for groups (for now)
        insertArray.push({
          title: `Movie ${i}`,
          tmdb_id: ``,
          poster_path: null,
          backdrop_path: null,
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
