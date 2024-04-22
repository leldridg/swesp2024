const queries = require('../database/queries');

function checkout(user_id, callback) {
    // get items in cart
    queries.cartItemsbyUID(user_id, (err, cartItems) => {
        if (err) { return callback(err); }
        cartItems.forEach(item => {
            //get available quantity of product
            //console.log(item.product_id);
            queries.getProdQuantity(item.product_id, (err, quantity) => {
                if (err) { return callback(err); }
                if(quantity - item.quantity < 0) { return callback("Quantity should not be negative"); }
                //update available quantity of product based on quantity in cart
                queries.updateProdQuantity(item.product_id, quantity - item.quantity, (err) => {
                    if (err) { return callback(err); }
                });
            });
            //delete item from cart
            //NOTE: deleting while iterating may cause issues, but hopefully not
            queries.deleteItemByIID(item.item_id, (err) => {
                if (err) { return callback(err); }
            });
        })
    })
    callback(null);
}

module.exports = { checkout }
