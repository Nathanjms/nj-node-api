const User = require("../models/user.model");

exports.checkUniqueEmail = async (req, res, next) => {
  try {
    let existingUser = await User.getUserFromEmail(req.body.email);
    if (existingUser) {
      res.status(401).send({
        error: true,
        message: "A user with that email address already exists.",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
