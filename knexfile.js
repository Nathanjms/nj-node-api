// Update with your config settings.
require("dotenv").config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "postgresql",
  connection: connectionString,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  connectionString: connectionString,
};
