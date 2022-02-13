const { pg } = require("../config/db.config");

const table = "movies";

const columnWhitelist = [
  "id",
  "title",
  "tmdb_id",
  "poster_path",
  "rating",
  "seen",
  "group_id",
];

const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

exports.getMoviesByUserId = async (userId, includeDeleted = false) => {
  let movies = pg(table).select(selectColumns).where("user_id", userId);

  if (!includeDeleted) {
    movies = movies.where("deleted_at", null);
  }

  return await movies;
};

exports.getMoviesByGroupId = async (groupId, includeDeleted = false) => {
  let movies = pg(table).select(selectColumns).where("group_id", groupId);

  if (!includeDeleted) {
    movies = movies.where("deleted_at", null);
  }

  return await movies;
};
