const Movie = require("../models/movie.model");

exports.index = async (req, res, next) => {
  try {
    let movies = await Movie.getMoviesByUserId(req.userId);
    return res.status(200).send({ movies: movies });
  } catch (error) {
    next(error);
  }
};
