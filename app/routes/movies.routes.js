const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/userMovieGroup.controller");
const authJWT = require("../middleware/authJwt");
const verifyUserMovieGroup = require("../middleware/verifyUserMovieGroup");
const verifyMovie = require("../middleware/verifyMovie");
const { checkAndValidateSchema } = require("../middleware/verifyValidInputs");
const userMovieGroupSchemas = require("../schemas/userMovieGroupSchemas");
const movieSchemas = require("../schemas/movieSchemas");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use("/api/movies", authJWT.verifyToken);

  /* Movie Groups */

  // Index
  app.get("/api/movies/groups", userMovieGroupController.index);

  // Create Group (& join it)
  app.post(
    "/api/movies/groups",
    checkAndValidateSchema(userMovieGroupSchemas.store),
    userMovieGroupController.store
  );

  // Join Group
  app.post(
    "/api/movies/groups/join",
    checkAndValidateSchema(userMovieGroupSchemas.join),
    verifyUserMovieGroup.verifyGroupExists,
    verifyUserMovieGroup.verifyUserGroupStatus(false), // User not in the group
    userMovieGroupController.joinGroup
  );

  // Leave Group
  app.post(
    "/api/movies/groups/leave",
    checkAndValidateSchema(userMovieGroupSchemas.leave),
    verifyUserMovieGroup.verifyGroupExists,
    verifyUserMovieGroup.verifyUserGroupStatus(true), // User must be in the group
    userMovieGroupController.leaveGroup
  );

  /* Movies */

  // Index
  app.get(
    "/api/movies",
    checkAndValidateSchema(movieSchemas.index),
    verifyUserMovieGroup.verifyGroupIfSet,
    movieController.index
  );
  /* TODO: Add appropriate methods & middlewares to the below */

  // Show method for specific movie
  app.get(
    "/api/movies/:movieId",
    checkAndValidateSchema(movieSchemas.show),
    verifyMovie.canUserAccessMovie,
    movieController.show
  );
  // Add new Movie
  app.post("/api/movies", movieController.store);
  // Mark movie as seen
  app.patch(
    "/api/movies/mark-seen",
    checkAndValidateSchema(movieSchemas.markAsSeen),
    verifyMovie.canUserAccessMovie,
    movieController.markAsSeen
  );
  // Review movie
  app.patch(
    "/api/movies/review",
    checkAndValidateSchema(movieSchemas.review),
    verifyMovie.canUserAccessMovie,
    movieController.review
  );
  // Mark movie as deleted
  app.delete(
    "/api/movies/:movieId",
    checkAndValidateSchema(movieSchemas.remove),
    verifyMovie.canUserAccessMovie,
    movieController.remove
  );
};
