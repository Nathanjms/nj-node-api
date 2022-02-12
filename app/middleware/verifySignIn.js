const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.checkUserCredentials = async (req, res, next) => {
  try {
    let user = await User.getUserFromEmail(req.body.email);
    if (!user) {
      res.status(401).send({
        error: true,
        message: "A user with that email address could not be found.",
      });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).send({ error: true, message: "Invalid password." });
      return;
    }

    // Add the user ID to the request body for reference in controller.
    req.userId = user.id;

    next();
  } catch (error) {
    next(error);
  }
};
