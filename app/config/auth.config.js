require("dotenv").config();

module.exports = {
  secret: process?.env?.SECRET_KEY ? process.env.SECRET_KEY : 'njdev',
};
