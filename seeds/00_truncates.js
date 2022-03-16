/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw(`
    TRUNCATE TABLE 
        users_movie_groups_link,
        movies, 
        user_movie_groups,
        users
    RESTART IDENTITY 
    CASCADE;`);
};
