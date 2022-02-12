const movieController = require("../controllers/movie.controller");
const authJWT = require("../middleware/authJwt");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use(authJWT.verifyToken);

  app.get("/api/movies", movieController.index);
};
