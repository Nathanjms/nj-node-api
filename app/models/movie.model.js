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
  "created_by",
  "backdrop_path",
  "created_at",
  "seen_at",
];

const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

exports.getById = async (id) => {
  return await pg(table)
    .select(selectColumns)
    .where({ id: id, deleted_at: null })
    .first();
};

exports.getMovies = async (
  userId,
  groupId,
  includeDeleted = false,
  watched = false,
  limit = 10,
  offset = 0,
  orderBy = { column: "id", order: "desc" }
) => {
  return await pg(table)
    .select(selectColumns)
    .modify((qB) => {
      qB.where("seen", watched);
      // Handle either group or user ID
      if (groupId) {
        qB.where("group_id", groupId);
      } else {
        qB.where({ created_by: userId, group_id: null });
      }
      // Handle includeDeleted
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    })
    .limit(limit)
    .offset(offset)
    .orderBy(orderBy.column, orderBy.order);
};

exports.getMovieCount = async (
  userId,
  groupId,
  includeDeleted = false,
  watched = false
) => {
  return (
    await pg(table)
      .modify((qB) => {
        qB.where("seen", watched);
        // Handle either group or user ID
        if (groupId) {
          qB.where({ group_id: groupId });
        } else {
          qB.where({ created_by: userId, group_id: null });
        }
        // Handle includeDeleted
        if (!includeDeleted) {
          qB.where({ [`${table}.deleted_at`]: null });
        }
      })
      .count("id")
      .first()
  )?.count;
};

exports.removeMoviesByGroupId = async (groupId) => {
  return await pg(table)
    .update({ deleted_at: "NOW()" })
    .where({ group_id: groupId });
};

exports.update = async (id, updateObject) => {
  return await pg(table).update(updateObject).where({ id: id });
};

exports.insert = async (insertObject) => {
  return await pg(table).insert(insertObject, "id");
};
