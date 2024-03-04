

require('dotenv').config();

const { Pool } = require('pg');

console.log(process.env.DATABASE_HOST);

const pool = new Pool({
	host : process.env.DATABASE_HOST,
	user : process.env.DATABASE_USER,
	password : process.env.PAWW,
	database : process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});




pool.connect((err => {
    if(err) throw err;
    console.log(`MySQL Connected`);
}));

module.exports = pool;

