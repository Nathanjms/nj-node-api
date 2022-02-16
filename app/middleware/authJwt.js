const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    let user = await User.getUserFromId(decoded.id);
    if (!user) {
      return res.status(403).send({ message: "User not found." });
    }
    req.userId = decoded.id;
    next();
  });
};
