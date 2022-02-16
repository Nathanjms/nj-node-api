const { pg } = require("../config/db.config");

const isNotDeleted = (queryBuilder, columnName = "deleted_at") => {
  queryBuilder.where(columnName, null);
};

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
  return await pg(table)
    .select(selectColumns)
    .where("user_id", userId)
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    });
};

exports.getMoviesByGroupId = async (groupId, includeDeleted = false) => {
  return await pg(table)
    .select(selectColumns)
    .where("group_id", groupId)
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    });
};

exports.removeMoviesByGroupId = async (groupId) => {
  return await pg(table)
    .update({ deleted_at: "NOW()" })
    .where({ group_id: groupId });
};
