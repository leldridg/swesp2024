

const { Pool } = require('pg');

const pool = new Pool({
	host : 'localhost',
	user : 'postgres',
	password : '1234',
	database : 'PetStoreDB',
    port: 5432 // Default port for PostgreSQL
});

pool.connect((err => {
    if(err) throw err;
    console.log(`MySQL Connected`);
}));

module.exports = pool;

