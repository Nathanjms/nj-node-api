const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/userMovieGroup.controller");
const authJWT = require("../middleware/authJwt");
const verifyUserMovieGroup = require("../middleware/verifyUserMovieGroup");
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

  app.get(
    "/api/movies",
    checkAndValidateSchema(movieSchemas.index),
    verifyUserMovieGroup.verifyGroupIfSet,
    movieController.index
  );
  // TODO: Add appropriate methods & middlewares:
  app.get("/api/movies/:movieId", movieController.show);
  app.post("/api/movies", movieController.store);
  app.patch("/api/movies/mark-seen", movieController.markAsSeen);
  app.patch("/api/movies/review", movieController.review);
  app.patch("/api/movies/delete", movieController.delete);
};
