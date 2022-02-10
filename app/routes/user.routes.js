const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user-info", [verifyToken], controller.userInfo);
};
