const { pg } = require("../config/db.config");

const table = `user_groups`;

const columnWhitelist = ["id", "name"];
const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

const isNotDeleted = (queryBuilder, columnName = "deleted_at") => {
  queryBuilder.where(columnName, null);
};

exports.getUserMovieGroupsByUserId = async (userId, includeDeleted = false) => {
  let userMovieGroups = pg("users_groups AS ugs")
    .join(table, "ugs.group_id", "=", `${table}.id`)
    .select(selectColumns)
    .where("ugs.user_id", userId);

  if (!includeDeleted) {
    userMovieGroups = userMovieGroups.modify(
      isNotDeleted,
      `${table}.deleted_at`
    );
  }

  return await userMovieGroups;
};

exports.getByUserIdAndGroupId = async (userId, groupId) => {
  return await pg("users_groups AS ugs")
    .join(table, "ugs.group_id", "=", `${table}.id`)
    .select(selectColumns)
    .where({
      user_id: userId,
      group_id: groupId,
    })
    .first();
};

exports.insertUserMovieGroup = async (name, password) => {
  let result = await pg(table).insert(
    {
      name: name,
      password: password,
    },
    "id"
  );

  return result[0]?.id;
};

exports.addUserToGroup = async (userId, groupId) => {
  return await pg("users_groups").insert({
    user_id: userId,
    group_id: groupId,
  });
};
