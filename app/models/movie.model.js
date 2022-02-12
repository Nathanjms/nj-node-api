const { pg } = require("../config/db.config");

const table = "movies";

const selectColumns = [
  "id",
  "title",
  "tmdb_id",
  "poster_path",
  "rating",
  "seen",
];

exports.getMoviesByUserId = async (userId, includeDeleted = false) => {
  let movies = pg(table)
    .select(selectColumns)
    .where("user_id", userId);

  if (!includeDeleted) {
    movies = movies.where("deleted_at", null);
  }

  return await movies;
};