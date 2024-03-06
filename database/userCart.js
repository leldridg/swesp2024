
const queries = require('../database/queries');

function getUserCart(user_id, callback) {
  queries.cartItemsbyUID(user_id, (err,cartItems) => {

    let arr = [];
    let completedRequests = 0;

    console.log(cartItems);
  

      cartItems.array.forEach((item, index) => {
        queries.productInfoFromPID(item.product_id, (err, description) => {
          arr[index] = description.rows; // Use index to maintain order
          console.log(description);

        });
        completedRequests++;

        if (completedRequests === cartItems.length) {
          // All requests have completed successfully
          callback(null, arr);
        }

    });
});

};

module.exports = { getUserCart }