const User = require("../models/user.model");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    let existingUser = await User.getUserFromEmail(req.body.email, true);
    if (existingUser) {
      return res.status(401).send({ message: "Email Address already exists" });
    }
    await User.insertUser(
      req.body.name,
      req.body.email,
      bcrypt.hashSync(req.body.password, 8)
    );
    return res.send({ message: "User was registered successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    let expiresIn = 86400; // 24 hours
    var token = jwt.sign({ id: req.userId }, config.secret, {
      expiresIn: expiresIn,
    });
    return res.status(200).send({ token: token, expiresIn: expiresIn });
  } catch (error) {
    next(error);
  }
};
