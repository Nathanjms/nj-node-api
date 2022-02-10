const User = require("../models/user.model");


exports.userInfo = async (req, res, next) => {
  try {
    let user = await User.getUserFromId(req.userId);
    if (!user) {
      return res.status(404).send({ error_message: "User not found."} );
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error)
  }
};
