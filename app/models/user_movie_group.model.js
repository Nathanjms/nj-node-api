const { pg } = require("../config/db.config");

const table = `user_groups`;

const columnWhitelist = ["id", "name"];
const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

exports.getUserMovieGroupsByUserId = async (userId, includeDeleted = false) => {
  let userMovieGroups = pg("users_groups AS ugs")
    .join(table, "ugs.group_id", "=", `${table}.id`)
    .select(selectColumns)
    .where("ugs.user_id", userId);

  if (!includeDeleted) {
    userMovieGroups = userMovieGroups.where(`${table}.deleted_at`, null);
  }

  return await userMovieGroups;
};
