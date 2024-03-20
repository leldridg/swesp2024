


/**
 * Queries file.
 * 
 * All queries live here. This is my attempt at making a middleware
 * 
 */

const db = require('../database/db.js'); // Adjust the path as necessary

// grabs all products from the table
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
//takes: username, password
//returns: null (inserts account into table)
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

// takes: user_id
// returns: null (remove all session_id table entries where the token is present)
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

// takes: session_id
// returns: boolean (has the session id already been used)
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

// takes: session_id, user_id
// returns: null (inserts the token and user into the table)
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

// takes: session_id
// returns: user_id
function uidFromSID(session_id, callback) {
  let sql = `
    SELECT user_id
    FROM session

    WHERE session_id = '${session_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null, null); }
    if(result.rows.length == 0){
      return callback(null, false, null);
    }
    if(result.rows[0].user_id == undefined){
      return callback(null, false, null);
    }
    callback(null, true, result.rows[0].user_id);
  });
}

// takes: user_id
// returns: username
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

// takes: uid
// returns: cart items
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

// takes: product_id
// returns: product info
function productInfoFromPID(product_id, callback) {
  let sql = `
    SELECT name, price, description
    FROM product

    WHERE product_id = '${product_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    callback(null, result.rows[0]);
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
