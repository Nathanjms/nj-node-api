const UserMovieGroup = require("../models/user_movie_group.model");

exports.index = async (req, res, next) => {
  try {
    let userMovieGroups = await UserMovieGroup.getUserMovieGroupsByUserId(req.userId);
    return res.status(200).send({ userMovieGroups: userMovieGroups });
  } catch (error) {
    next(error);
  }
};
