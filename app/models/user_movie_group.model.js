const { pg } = require("../config/db.config");

const tableAlias = "ug";
const table = `user_groups AS ${tableAlias}`;

const selectColumns = ["id", "name"].map((element) => {
  return tableAlias + "." + element;
});

exports.getUserMovieGroupsByUserId = async (userId, includeDeleted = false) => {
  let userMovieGroups = pg("users_groups AS ugs")
    .join(table, "ugs.group_id", "=", "ug.id")
    .select(selectColumns)
    .where("ugs.user_id", userId);

  if (!includeDeleted) {
    userMovieGroups = userMovieGroups.where(`${tableAlias}.deleted_at`, null);
  }

  return await userMovieGroups;
};
