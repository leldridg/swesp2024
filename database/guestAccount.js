

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

  let username = "guest" + extraText;
  let password = "guest" + extraText;

  console.log(username);

  queries.accountTaken(username, (err, taken) => {
    if (err) { return next(err); }
    if (taken) {
      console.log('non unique username');
    } else {
      queries.createAccount(username, password, (err, success) => {
        if (err) { return next(err, null); }
        generator.generateToken(username, (err, token) => {
          if (err) { return next(err, null) }

          // queries.uidFromSID(token, (err, exists, user_id) => {
            queries.idByUsername(username, (err, user_id) => {

              console.log("user_id " + user_id);
              if (err) { return callback(err); }
                queries.addItemToCart(user_id, productId, quantity, (err) => {
                if (err) {
                  console.log(err)
                  return res.status(500).send('An error occurred');
                } else {
                  console.log("this code has ran and redirected");
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
