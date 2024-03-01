

const { Pool } = require('pg');

console.log(process.env.PAWW);

const pool = new Pool({
	host : process.env.DATABASE_HOST,
	user : process.env.DATABASE_USER,
	password : "1234",
	database : process.env.DATABASE_NAME,
    port: process.env.DATABASE_HOST
});




pool.connect((err => {
    if(err) throw err;
    console.log(`MySQL Connected`);
}));

module.exports = pool;

