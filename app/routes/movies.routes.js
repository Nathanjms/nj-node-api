const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/userMovieGroup.controller");
const authJWT = require("../middleware/authJwt");
const { verifyGroupIfSet } = require("../middleware/verifyUserMovieGroup");
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

  // // Join/Leave Group
  // app.patch(
  //   "/api/movies/groups/join",
  //   checkAndValidateSchema(
  //     /* Add new schema here */
  //     userMovieGroupSchemas.store
  //   ),
  //   verifyGroupIfSet,
  //   userMovieGroupController.joinGroup
  // );

  // // Join/Leave Group
  // app.patch(
  //   "/api/movies/groups/leave",
  //   checkAndValidateSchema(
  //     /* Add new schema here */
  //     userMovieGroupSchemas.store
  //   ),
  //   verifyGroupIfSet,
  //   userMovieGroupController.leaveGroup
  // );
  

  /* Movies */

  app.get(
    "/api/movies",
    checkAndValidateSchema(movieSchemas.index),
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
