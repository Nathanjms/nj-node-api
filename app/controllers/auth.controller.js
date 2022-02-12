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
    let user = await User.getUserFromEmail(req.body.email);

    // Dont wan't to do DB calls in middleware (for now at least), so handle user checks relating to database here
    let isValid = _validUserDetails(user, req.body.password);
    if (!isValid.valid) {
      res.status(isValid.code).send({ message: isValid.message });
      return;
    }

    let expiresIn = 86400; // 24 hours
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: expiresIn,
    });
    return res.status(200).send({ token: token, expiresIn: expiresIn });
  } catch (error) {
    next(error);
  }
};

const _validUserDetails = (user, inputPassword) => {
  if (!user) {
    return {
      valid: false,
      code: 401,
      message: "User Not found.",
    };
  }
  if (!bcrypt.compareSync(inputPassword, user.password)) {
    return {
      valid: false,
      code: 401,
      message: "Invalid Password",
    };
  }
  return { valid: true };
};
