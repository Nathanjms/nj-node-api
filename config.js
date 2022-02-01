const { Pool } = require("pg");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  host: process?.env?.DB_HOST ? process?.env?.DB_HOST : 'nj-db',
  port: process?.env?.DB_PORT ? process?.env?.DB_PORT : '5432',
  user: process?.env?.DB_USER ? process?.env?.DB_USER : 'nj',
  password: process?.env?.DB_PASSWORD ? process?.env?.DB_PASSWORD : 'dev',
  database: process?.env?.DB_DATABASE ? process?.env?.DB_DATABASE : 'nathanjms_api',
  ssl: isProduction ? { rejectUnauthorized: false } : false,
})

module.exports = { pool };
