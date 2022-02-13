const UserMovieGroup = require("../models/user_movie_group.model");

const verifyGroupIfSet = async (req, res, next) => {
  try {
    if (!req.query.groupId) {
      // GroupID not input, so passes.
      next();
      return;
    }

    let userMovieGroup = await UserMovieGroup.getByUserIdAndGroupId(
      req.userId,
      req.query.groupId
    );
    if (!userMovieGroup) {
      res.status(401).send({
        error: true,
        message: "User is not in the group.",
      });
      return;
    }
    // Add the group ID to the request body for reference in controller.
    req.groupId = req.query.groupId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyGroupIfSet };