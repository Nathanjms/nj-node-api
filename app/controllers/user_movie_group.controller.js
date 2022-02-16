const UserMovieGroup = require("../models/user_movie_group.model");

exports.index = async (req, res, next) => {
  try {
    let userMovieGroups = await UserMovieGroup.getUserMovieGroupsByUserId(
      req.userId
    );
    return res.send({ userMovieGroups: userMovieGroups });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Create group
    // Add user to group
    // Return success and user's new groups.
    return res.send({ message: "store" });
  } catch (error) {
    next(error);
  }
};

exports.joinOrLeaveGroup = async (req, res, next) => {
  try {
    // Verify password then add user if successful
    return res.send({ message: "Join/Leave" });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Unsure if this will be added, or just allow leaving above
    return res.send({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
