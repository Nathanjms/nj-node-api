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
    // Return details about one movie (already have details from request)
    if (!req?.movie) {
      throw new Error("Movie not assigned correctly in middleware");
    }
    return res.send({ movie: req.movie });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Add new movie
    return res.send({ message: "store" });
  } catch (error) {
    next(error);
  }
};

exports.markAsSeen = async (req, res, next) => {
  try {
    if (!req?.movie) {
      throw new Error("Movie not assigned correctly in middleware");
    }
    // Mark Movie As Seen
    await Movie.update(req?.movie?.id, { seen: req.body.seen });
    return res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.review = async (req, res, next) => {
  try {
    // Review movie
    return res.send({ message: "review" });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Delete movie  (mark as deleted)
    return res.send({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
