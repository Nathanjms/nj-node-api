require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const { connectionString } = require("../../knexfile");
const pg = require("knex")({
  client: "pg",
  connection: connectionString,
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = { pg, isProduction };
