


/**
 * Queries file.
 * 
 * All queries live here. This is my attempt at making a middleware
 * 
 */

const db = require('../database/db.js'); // Adjust the path as necessary


function fetchProducts(callback) {
  let sql =
    `
    SELECT *
    FROM product;
    `
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.rows);
  });
}

function createAccount(){
  
}


module.exports = { fetchProducts };
