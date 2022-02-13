const UserMovieGroup = require("../models/user_movie_group.model");

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
      res.status(401).send({
        error: true,
        message: "User is not in the group.",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyGroupIfSet };
