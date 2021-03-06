const UserMovieGroup = require("../models/userMovieGroup.model");

const verifyGroupIfSet = async (req, res, next) => {
  try {
    if (!req.query.groupId && !req.body.groupId) {
      // GroupID not input, so passes.
      next();
      return;
    }

    // Account for being passed in either body or header.
    req.groupId = req.query.groupId ? req.query.groupId : req.body.groupId;

    let userMovieGroup = await UserMovieGroup.getByUserIdAndGroupId(
      req.userId,
      req.groupId
    );
    if (!userMovieGroup) {
      return res.status(401).send({
        error: true,
        message: "User is not in the group.",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyGroupExists = async (req, res, next) => {
  try {
    req.groupId = req.body.groupId;

    let group = await UserMovieGroup.itemExists(req.groupId);
    if (!group) {
      return res.status(401).send({
        error: true,
        message: "Group does not exist.",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUserGroupStatus = (inGroup) => {
  return async (req, res, next) => {
    try {
      let group = await UserMovieGroup.getByUserIdAndGroupId(
        req.userId,
        req.groupId
      );
      // If the opposite status is passed than the user's status (eg. user isn't in group when they must be)
      if (inGroup !== Boolean(group)) {
        let conditional = !inGroup ? "already" : "not";
        return res.status(401).send({
          error: true,
          message: `User is ${conditional} in this group`,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { verifyGroupIfSet, verifyGroupExists, verifyUserGroupStatus };
