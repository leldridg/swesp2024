

const queries = require('../database/queries');
const generator = require('../database/generateToken');

//this function takes a product_id
//deletes products associated with the product_id from product
//deletes cart items associated with the product_id from cart_item
//deletes the category associations in product_category
//callback: err

function guestAccount(productId, quantity, callback) {
  // create an account
  // give em a token?

  const generateRandomAlphanumeric = length => Array.from({ length }, () => "ABCDEFG0123456789".charAt(Math.floor(Math.random() * 16))).join('');

  let extraText = generateRandomAlphanumeric(8);
  let extraPassword = generateRandomAlphanumeric(20);

  let username = "guest" + extraText;
  let password = "g" + extraPassword;

  queries.accountTaken(username, (err, taken) => {
    if (err) { return callback(err, null); }
    if (taken) {
      console.log('non unique username');
    } else {
      queries.createAccount(username, password, (err, success) => {
        if (err) { return callback(err, null); }
        generator.generateToken(username, (err, token) => {
          if (err) { return callback(err, null) }

          // queries.uidFromSID(token, (err, exists, user_id) => {
            queries.idByUsername(username, (err, user_id) => {
              if (err) { return callback(err, null); }
                queries.addItemToCart(user_id, productId, quantity, (err) => {
                if (err) {
                  console.log(err)
                  return callback(err,null);
                } else {
                  callback(null, token)
                }
              });
          });
        });
      });
    }
  });
}

module.exports = { guestAccount }
