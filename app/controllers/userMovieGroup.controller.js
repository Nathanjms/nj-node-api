const UserMovieGroup = require("../models/userMovieGroup.model");
const bcrypt = require("bcryptjs");

exports.index = async (req, res, next) => {
  try {
    let userMovieGroups = await UserMovieGroup.getUserMovieGroupsByUserId(
      req.userId
    );
    return res.send({ userMovieGroups: userMovieGroups });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    // Create new movie group
    let insertId = await UserMovieGroup.insertUserMovieGroup(
      req.body.name,
      bcrypt.hashSync(req.body.password, 8)
    );
    if (!insertId) {
      throw new Error("Insert ID not retrieved from insertion - did it work?");
    }

    await UserMovieGroup.addUserToGroup(req.userId, insertId);

    return res.send({ message: "Group created successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.joinGroup = async (req, res, next) => {
  try {
    // Verify password then add user if successful
    return res.send({ message: "Join" });
  } catch (error) {
    next(error);
  }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    // Remove user, then delete group if empty (after deleting movies in group!)
    return res.send({ message: "Leave" });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Unsure if this will be added, or just allow leaving above
    return res.send({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
