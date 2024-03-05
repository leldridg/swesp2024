

/**
 * Initializes and exports a PostgreSQL connection pool.
 * 
 * Connects to the database upon initialization and logs connection status. 
 * 
 * Throws error if connection fails.
 */

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PAWW,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

pool.connect((err => {
  if (err) throw err;
  console.log(`MySQL Connected`);
}));

module.exports = pool;

