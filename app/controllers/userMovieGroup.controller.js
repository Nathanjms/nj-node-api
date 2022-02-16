const UserMovieGroup = require("../models/userMovieGroup.model");
const Movie = require("../models/movie.model");
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
    await UserMovieGroup.addUserToGroup(req.userId, req.groupId);
    return res.send({ message: "Joined group Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    // Remove user, then delete group if empty (after deleting movies in group!)
    await UserMovieGroup.removeUserFromGroup(req.userId, req.groupId);
    let groupUserCount = await UserMovieGroup.countUsersInGroup(req.groupId);
    if (!groupUserCount) {
      await UserMovieGroup.remove(req.groupId);
      await Movie.removeMoviesByGroupId(req.groupId);
    }
    return res.send({ message: "Left Group Successfully" });
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
