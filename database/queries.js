


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
    if (err) { return callback(err, null); }
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
    if (err) { return callback(err, null); }
    callback(null)
  });
}

// takes: username
// returns: boolean (if account taken)
function accountTaken(username, callback) {
  let sql =
    `
  SELECT username 
  FROM account 
  WHERE username = '${username}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }

    callback(null, result.rows.length > 0);
  });
}

// takes: username, password
// returns: boolean (if login is valid)
function loginValid(username, password, callback) {
  let sql =
    `
  SELECT username, password
  FROM account 
  
  WHERE username = '${username}' AND password = '${password}';
  `

  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }

    callback(null, result.rows.length > 0);
  });
}

// takes: username
// returns: user_id
async function idByUsername(username, callback) {
  let sql =
    `
  SELECT user_id
  FROM account 
  
  WHERE username = '${username}';
  `

  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    callback(null, result.rows[0].user_id);
  });
}

function removeToken(user_id, callback) {
  let sql =
    `
  DELETE FROM session
  WHERE user_id = '${user_id}'
  `
  db.query(sql, (err) => {
    if (err) { return callback(err); }
  });
}


function checkTokenUnique(session_id, callback) {
  let sql =
    `
  SELECT session_id
  FROM session 
  
  WHERE session_id = '${session_id}';
  `

  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    callback(null, result.rows.length == 0);
  });
}


function insertToken(session_id, user_id, callback) {
  let sql =
    `
    INSERT INTO session (session_id, user_id)

    VALUES ('${session_id}', '${user_id}');
    `
  db.query(sql, (err) => {
    if (err) { return callback(err, null); }
    callback(null)
  });
}

function uidFromSID(session_id, callback) {
  let sql = `
    SELECT user_id
    FROM session

    WHERE session_id = '${session_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null, null); }
    if(result.rows[0].user_id == undefined){
      return callback(null, false, null);
    }
    callback(null, true, result.rows[0].user_id);
  });
}

function usernameByUID(user_id, callback) {
  let sql = `
    SELECT user_id, profile_img, username
    FROM account

    WHERE user_id = '${user_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    if(result.rows[0].username == undefined){
      return callback('username undefined', null);
    }
    callback(null, result.rows[0].username);
  });
}

//
function cartItemsbyUID(user_id, callback) {
  let sql = `
    SELECT item_id, product_id, quantity
    FROM cart_item

    WHERE user_id = '${user_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    callback(null, result.rows);
  });
}

function productInfoFromPID(product_id, callback) {
  let sql = `
    SELECT name, price, description
    FROM product

    WHERE product_id = '${product_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    console.log(result)
    callback(null, result);
  });
}

module.exports = {
  fetchProducts,
  createAccount,
  accountTaken,
  loginValid,
  idByUsername,
  removeToken,
  checkTokenUnique,
  insertToken,
  uidFromSID,
  usernameByUID,
  cartItemsbyUID,
  productInfoFromPID
};
