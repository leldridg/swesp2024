// teardown.js

const pool = require('./database/db.js');

module.exports = async () => {
  await pool.end();
};
