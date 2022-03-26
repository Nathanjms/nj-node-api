const Movie = require("../models/movie.model");

exports.index = async (req, res, next) => {
  try {
    let movies = {};
    let movieCount = 0;
    let orderBy = { column: "id", order: "desc" };

    // Assign group ID if set
    let groupId = req?.groupId ? req.groupId : null;

    // Pagination variables
    let page = req.body?.page ? req.body.page : req.query.page;
    let limit = req.body?.perPage ? req.body.perPage : req.query.perPage;
    let offset = limit * (page - 1);

    movieCount = Number(
      await Movie.getMovieCount(req.userId, groupId, false, req.query.watched)
    );

    // If no movies, no need to continue
    if (!movieCount) {
      return res.send({
        movies: [],
        nextPageUrl: null,
        prevPageUrl: null,
      });
    }

    if (req?.query?.orderCol) {
      orderBy.column = req.query.orderCol;
    }
    if (req?.query?.order) {
      orderBy.order = req.query.order;
    }

    let { nextPageUrl, prevPageUrl } = computeUrls(
      movieCount,
      limit,
      page,
      groupId,
      req?.query?.watched,
      orderBy
    );

    movies = await Movie.getMovies(
      req.userId,
      groupId,
      false,
      req.query.watched,
      limit,
      offset,
      orderBy
    );
    return res.send({
      movies: movies,
      nextPageUrl: nextPageUrl,
      prevPageUrl: prevPageUrl,
    });
  } catch (error) {
    next(error);
  }
};

const computeUrls = (movieCount, limit, page, groupId, watched, orderBy) => {
  let nextPageUrl = null;
  let prevPageUrl = null;

  let sharedParamsUrl = `/api/movies?perPage=${limit}&watched=${watched}&order=${orderBy.order}&orderCol=${orderBy.column}`;
  if (groupId) {
    sharedParamsUrl += `&group_id=${groupId}`;
  }

  if (movieCount > limit * page) {
    nextPageUrl = sharedParamsUrl + `&page=${page + 1}`;
  }
  if (page > 1) {
    prevPageUrl = sharedParamsUrl + `&page=${page - 1}`;
  }

  return { nextPageUrl: nextPageUrl, prevPageUrl: prevPageUrl };
};

exports.show = async (req, res, next) => {
  try {
    if (!req?.movie) {
      throw new Error("Movie not assigned correctly in middleware");
    }
    // Return details about one movie (already have details from request)
    return res.send({ movie: req.movie });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Add new movie
    let newMovie = await Movie.insert({
      title: req.body.title,
      tmdb_id: req.body.tmdbId,
      poster_path: req.body?.posterPath ? req.body.posterPath : null,
      backdrop_path: req.body?.backdropPath ? req.body.backdropPath : null,
      group_id: req.body?.groupId ? req.body.groupId : null,
      created_by: req.userId,
    });

    let newMovieId = newMovie[0]?.id;
    return res.send({ success: true, movieId: newMovieId });
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
    await Movie.update(req.movie.id, { seen: req.body.seen, seen_at: "NOW()" });
    return res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.review = async (req, res, next) => {
  try {
    if (!req?.movie) {
      throw new Error("Movie not assigned correctly in middleware");
    }
    // Update movie with rating
    await Movie.update(req?.movie?.id, { rating: req.body.rating });
    return res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!req?.movie) {
      throw new Error("Movie not assigned correctly in middleware");
    }
    // Delete movie  (mark as deleted)
    await Movie.update(req?.movie?.id, { deleted_at: "NOW()" });
    return res.send({ success: true });
  } catch (error) {
    next(error);
  }
};
