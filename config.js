const { Pool } = require("pg");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'nj',
  password: 'dev',
  database: 'nathanjms_api',
  ssl: isProduction ? { rejectUnauthorized: false } : false,
})

module.exports = { pool };
