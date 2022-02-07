const { pg } = require("../config/db.config");

const getNames = async (req, res, next) => {
  try {
    const result = await pg.from("users").pluck("name");
    res.json({
      users: result,
    });
  } catch (error) {
    next(error);
  }
};

const getEmails = async (req, res, next) => {
  try {
    const result = await pg.from("users").pluck("email");
    res.json({
      users: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getNames,
  getEmails,
};
