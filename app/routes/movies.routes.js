const movieController = require("../controllers/movie.controller");
const userMovieGroupController = require("../controllers/user_movie_group.controller");
const authJWT = require("../middleware/authJwt");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use("/api/movies", authJWT.verifyToken);

  app.get("/api/movies", movieController.index);
  app.get("/api/movies/groups", userMovieGroupController.index);

};
