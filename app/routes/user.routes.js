const userController = require("../controllers/user.controller");
const authJWT = require("../middleware/authJwt");

module.exports = (app) => {
  // All routes in here will need valid JWT
  app.use("/api/users", authJWT.verifyToken);

  app.get("/api/users", userController.userInfo);
};
