const UserMovieGroup = require("../models/user_movie_group.model");

exports.verifyUserInMovieGroup = async (req, res, next) => {
  try {
    let userMovieGroup = await UserMovieGroup.getUserGroupFromUserIdAndGroupId(
      req.userId,
      req.body.groupId
    );
    if (!userMovieGroup) {
      res.status(401).send({
        error: true,
        message: "User is not in the group.",
      });
      return;
    }
    // Add the group ID to the request body for reference in controller.
    req.groupId = req.body.groupId;
    next();
  } catch (error) {
    next(error);
  }
};
