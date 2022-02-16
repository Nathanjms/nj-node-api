const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/user_movie_group.controller");
const authJWT = require("../middleware/authJwt");
const { verifyGroupIfSet } = require("../middleware/verifyUserInMovieGroup");
const { checkAndValidateSchema } = require("../middleware/verifyValidInputs");
const userMovieGroupSchemas = require("../schemas/userMovieGroupSchemas");
const { moviesIndexSchema } = require("../schemas/movieSchemas");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use("/api/movies", authJWT.verifyToken);

  /* Movie Groups */

  // TODO: Add appropriate methods & middlewares:

  // Index
  app.get("/api/movies/groups", userMovieGroupController.index);

  // Create Group
  app.post(
    "/api/movies/groups",
    checkAndValidateSchema(userMovieGroupSchemas.store),
    userMovieGroupController.store
  );

  // Join/Leave Group
  app.patch(
    "/api/movies/groups",
    checkAndValidateSchema({
      /* Add new schema here */
    }),
    verifyGroupIfSet,
    userMovieGroupController.leaveGroup
  );

  /* Movies */

  app.get(
    "/api/movies",
    checkAndValidateSchema(moviesIndexSchema),
    verifyGroupIfSet,
    movieController.index
  );
  // TODO: Add appropriate methods & middlewares:
  app.get("/api/movies/:movieId", movieController.show);
  app.post("/api/movies", movieController.store);
  app.patch("/api/movies/mark-seen", movieController.markAsSeen);
  app.patch("/api/movies/review", movieController.review);
  app.patch("/api/movies/delete", movieController.delete);
};
