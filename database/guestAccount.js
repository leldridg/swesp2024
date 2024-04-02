

const queries = require('../database/queries');
const generator = require('../database/generateToken');

//this function takes a product_id
//deletes products associated with the product_id from product
//deletes cart items associated with the product_id from cart_item
//deletes the category associations in product_category
//callback: err

function guestAccount(callback) {
    // create an account
    // give em a token?

    const generateRandomAlphanumeric = length => Array.from({ length }, () => "abcdefg0123456789".charAt(Math.floor(Math.random() * 62))).join('');

    let extraText = generateRandomAlphanumeric(8);


    let username = "guest" + extraText;
    let password = "guest" + extraText;

    console.log(username);

    queries.accountTaken(username, (err, taken) => {
        if (err) { return next(err); }
    
        if (taken) {  
          // Username already taken, render the page with a flag and the submitted password
          console.log('non unique token created');
        } else {
          
          queries.createAccount(username, password, (err, success) => {
            if (err) { return next(err); }
            // If the account is successfully created, send a success message
            generator.generateToken(username, (err, token) => {
              if (err) { return next(err) }
              queries.uidFromSID(token, (err, exists, user_id) => {
              if (err) { return next(err) }
              if(exists){
                callback(null, token, user_id);
              } else {
                console.log("null error");
                callback(null, null, null);
              }
              });
            });
          });
        }
      });
}

module.exports = { guestAccount }
