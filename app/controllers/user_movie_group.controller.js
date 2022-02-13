const UserMovieGroup = require("../models/user_movie_group.model");

exports.index = async (req, res, next) => {
  try {
    let userMovieGroups = await UserMovieGroup.getUserMovieGroupsByUserId(req.userId);
    return res.status(200).send({ userMovieGroups: userMovieGroups });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Create group
  } catch (error) {
    next(error);
  }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    // Delete user's entry in the group
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Unsure if this will be added, or just allow leaving above
  } catch (error) {
    next(error);
  }
};

