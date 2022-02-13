const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/user_movie_group.controller");
const authJWT = require("../middleware/authJwt");
const { verifyGroupIfSet } = require("../middleware/verifyUserInMovieGroup");
const verifyValidInputs = require("../middleware/verifyValidInputs");
const { moviesIndexSchema } = require("../schemas/moviesIndexSchema");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use("/api/movies", authJWT.verifyToken);

  app.get(
    "/api/movies",
    verifyValidInputs.checkAndValidate(moviesIndexSchema),
    verifyGroupIfSet,
    movieController.index
  );
  app.get("/api/movies/groups", userMovieGroupController.index);
};
