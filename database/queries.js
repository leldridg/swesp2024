


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

function createAccount(username, password, callback) {
  let sql =
    `
    INSERT INTO account (username, password, is_admin, login_time)
    VALUES ('${username}', '${password}', FALSE, NOW());
    `
  db.query(sql, (err, result) => {
    if(err){
      return callback(err, null);
    }
    callback(null)
  });
}

function accountTaken(username, callback) {
  let sql =
  `
  SELECT username 
  FROM account 
  WHERE username = '${username}';
  `
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }


    callback(null, result.rows.length > 0);
  });
}

function loginValid(username, password, callback) {
  let sql =
  `
  SELECT username, password
  FROM account 
  
  WHERE username = '${username}' AND password = '${password}';
  `
  
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }


    callback(null, result.rows.length > 0);
  });
}


module.exports = { fetchProducts, createAccount, accountTaken, loginValid};
