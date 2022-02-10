require("dotenv").config();

const { connection } = require("../../knexfile");

const pg = require("knex")({
  client: "pg",
  connection: connection,
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = { pg };
