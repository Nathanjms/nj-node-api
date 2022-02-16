const { pg } = require("../config/db.config");

const table = `user_groups`;

const columnWhitelist = ["id", "name"];
const selectColumns = columnWhitelist.map((element) => {
  return table + "." + element;
});

exports.getUserMovieGroupsByUserId = async (userId, includeDeleted = false) => {
  return await pg("users_groups AS ugs")
    .join(table, "ugs.group_id", "=", `${table}.id`)
    .select(selectColumns)
    .where("ugs.user_id", userId)
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ [`${table}.deleted_at`]: null });
      }
    });
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

exports.itemExists = async (groupId, includeDeleted = false) => {
  let result = await pg(table)
    .where({ id: groupId })
    .modify((qB) => {
      if (!includeDeleted) {
        qB.where({ deleted_at: null });
      }
    })
    .count("id")
    .first();

  return Number(result?.count) > 0;
};

exports.remove = async (groupId) => {
  await pg(table).where({ id: groupId }).update({
    deleted_at: "NOW()",
  });
};

exports.removeUserFromGroup = async (userId) => {
  return await pg("users_groups").where({ user_id: userId }).del();
};

exports.countUsersInGroup = async (groupId) => {
  let result = await pg("users_groups")
    .where({ group_id: groupId })
    .count("id")
    .first();
  return Number(result?.count);
};
