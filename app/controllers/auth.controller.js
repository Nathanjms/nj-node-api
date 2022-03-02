const User = require("../models/user.model");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
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
    let expiresIn = process?.env?.JWT_EXPIRY
      ? parseInt(process.env.JWT_EXPIRY)
      : 86400; // Get expiry from .env file
    var token = jwt.sign({ id: req.userId }, config.secret, {
      expiresIn: expiresIn,
    });
    let expiryDate = new Date();
    let expiryDateMs = expiryDate.valueOf() + expiresIn * 1000; // Format date to timestamp in ms and send in response.
    return res.status(200).send({ token: token, expiryDate: expiryDateMs });
  } catch (error) {
    next(error);
  }
};
