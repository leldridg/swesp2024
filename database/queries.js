


/**
 * Queries file.
 * 
 * All queries live here. This is my attempt at making a middleware
 * 
 */

const db = require('../database/db.js'); // Adjust the path as necessary

// update product
// takes name, price, description, image, quantity, product_id
function updateProd(name, price, description, image, quantity, product_id, callback) {

  let sql =
  `
  UPDATE product 
  SET name = '${name}', price = '${price}', description = '${description}', image = '${image}', quantity = '${quantity}'
  WHERE product_id = '${product_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err); }

    else { callback(null); }
  });
}

// update available quantity of specified product
// takes product_id, quantity
function updateProdQuantity(product_id, quantity, callback) {
  let sql =
  `
  UPDATE product
  SET quantity = '${quantity}'
  WHERE product_id = '${product_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err); }
  });
}

// get available quantity of specified product
// takes product_id
// returns available quantity
function getProdQuantity(product_id, callback) {
  let sql =
  `
  SELECT quantity
  FROM product
  WHERE product_id = '${product_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err, undefined);} //might not be handling all cases here
    callback(null, result.rows.quantity);
  });
}

// add a new product to the product table
// takes: product name, product img url, price, available quantity, description
// returns: nothing?
// NOTE: no input validation is being done here
// also, no differentiation between image and thumbnail right now
function addProduct(name, img, price, quantity, desc, callback) {
  let sql =
  `
  INSERT INTO product (name, image, thumbnail, price, quantity, description)
  VALUES ('${name}', '${img}', '${img}', '${price}', '${quantity}', '${desc}');
  `
  db.query(sql, (err) => {
    if (err) {return callback(err); }
  });
}

function updateItemQuantity(item_id, quantity, callback) {
  let sql =
  `
  UPDATE cart_item
  SET quantity = '${quantity}'
  WHERE item_id = '${item_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err); }
    callback(null);
  })
}

// delete an item from cart_item based on item_id
// takes: item_id
// returns: nothing
function deleteItemByIID(item_id, callback) {
  let sql =
  `
  DELETE FROM cart_item WHERE item_id = '${item_id}';
  `
  db.query(sql, (err) => {
    if (err) { return callback(err); }

  });
}

// delete an item from cart_item based on product_id
// takes product_id
// returns: nothing
function deleteItemByPID(product_id, callback) {
  let sql =
  `
  DELETE FROM cart_item WHERE product_id = '${product_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err);}
  });
}

// delete an item from cart_item based on user_id and product_id
// takes user_id, product_id
// returns: nothing
function deleteItemByUIDPID(user_id, product_id, callback) {
  let sql =
  `
  DELETE FROM cart_item
  WHERE product_id = '${product_id}'
    AND user_id = '${user_id}';
  `
  db.query(sql, (err) => {
    if (err) { return callback(err); }
  });
}

// delete a product from product table pased on product_id
// takes product_id
// returns nothing
// NOTE: DO NOT USE DIRECTLY TO DELETE A PRODUCT AS ADMIN,
// INSTEAD, USE FUNCTION IN deleteProduct.js
function deleteProductByPID(product_id, callback) {
  let sql =
  `
  DELETE FROM product WHERE product_id = '${product_id}';
  `

  db.query(sql, (err) => {
    if (err) {return callback(err);}
  });
}

//delete rows in product_category given a product_id
//takes: product_id
//returns: nothing
function deleteProdcatByPID(product_id, callback) {
  let sql =
  `
  DELETE FROM product_category WHERE product_id = '${product_id}';
  `
  db.query(sql, (err) => {
    if (err) {return callback(err);}
  });
}

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
    callback(null);
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
    callback(null);
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
    if(result.rows[0] == undefined){
      return callback(null, false, null);
    }

    if(result.rows[0].user_id == undefined){
      return callback(null, false, null);
    }
    callback(null, true, result.rows[0].user_id); //err, exists, user_id
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
    SELECT name, price, description, quantity, image
    FROM product

    WHERE product_id = '${product_id}';
  `
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null); }
    callback(null, result.rows[0]);
  });
}

// takes: user_id
// returns: exists boolean, is_admin boolean
// callback: err, exists, is_admin
function adminFromUID(user_id, callback) {
  let sql = 
  `
    SELECT is_admin
    FROM account

    WHERE user_id = '${user_id}';
  `

  //not sure about this section, or quite what kind of error handling needs to be done here
  db.query(sql, (err, result) => {
    if (err) { return callback(err, null, null); }
    if(result.rows[0].is_admin == undefined) {
      return callback(null, false, null);
    }
    callback(null, true, result.rows[0].is_admin);
  });
}

function addItemToCart(user_id, product_id, quantity, callback){

  let sql = 
  `
  INSERT INTO cart_item (user_id, product_id, quantity)
  VALUES ('${user_id}', '${product_id}', ${quantity});
  `


  db.query(sql, (err, result) => {
    if (err) { return callback(err); }
    else {
      callback(null);
    }
  });
}



module.exports = {
  updateProdQuantity,
  updateItemQuantity,
  getProdQuantity,
  addProduct,
  deleteItemByIID,
  deleteItemByPID,
  deleteItemByUIDPID,
  deleteProdcatByPID,
  deleteProductByPID,
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
  productInfoFromPID,
  adminFromUID,
  addItemToCart,
  updateProd
};
