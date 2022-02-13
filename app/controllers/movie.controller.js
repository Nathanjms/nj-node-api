const Movie = require("../models/movie.model");

exports.index = async (req, res, next) => {
  try {
    let movies = {};
    if (req.groupId) {
      movies = await Movie.getMoviesByGroupId(req.groupId);
    } else {
      movies = await Movie.getMoviesByUserId(req.userId);
    }
    return res.status(200).send({ movies: movies });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    // Get details about one movie
    return res.send({});
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Add new movie
    return res.send({});
  } catch (error) {
    next(error);
  }
};

exports.markAsSeen = async (req, res, next) => {
  try {
    // Mark Movie As Seen
    return res.send({});
  } catch (error) {
    next(error);
  }
};

exports.review = async (req, res, next) => {
  try {
    // Review movie
    return res.send({});
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Delete movie  (mark as deleted)
    return res.send({});
  } catch (error) {
    next(error);
  }
};
