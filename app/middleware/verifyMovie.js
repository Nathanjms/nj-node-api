const Movie = require("../models/movie.model");
const UserMovieGroup = require("../models/userMovieGroup.model");

const canUserAccessMovie = async (req, res, next) => {
  try {
    // Get movie from either param or body
    let movieId = req?.params?.movieId ? req.params.movieId : req.body.movieId;

    // Get movie (and assign it to request for controller access)
    req.movie = await Movie.getById(movieId);

    // Check if movie exists
    if (!req?.movie?.id) {
      return res.status(404).send({
        error: true,
        message: "Movie not found.",
      });
    }

    // If the movie is created by user, they will always be able to access
    if (Number(req?.movie.created_by) === req.userId) {
      return next();
    }

    // If we've made it to here, the user may still qualify via a group...
    let usersMovieGroups = await UserMovieGroup.getUserMovieGroupIdsByUserId(
      req.userId
    );

    if (req?.movie?.group_id && usersMovieGroups.includes(req.movie.group_id)) {
      return next();
    }

    // If we've made it to here, the user is unauthorized
    return res.status(401).send({
      error: true,
      message: "User does not have permission to access this Movie",
    });
  } catch (error) {
    next(error);
  }
};

const validMovieOrderByColumns = ['created_at', 'title', 'seen_at']; // TODO: Handle seen_at when marked as seen

module.exports = { canUserAccessMovie, validMovieOrderByColumns };
