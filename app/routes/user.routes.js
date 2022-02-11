const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
  app.get("/api/user-info", [verifyToken], controller.userInfo);
};
