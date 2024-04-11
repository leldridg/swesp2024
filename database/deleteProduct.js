const queries = require('../database/queries');

//this function takes a product_id
//deletes products associated with the product_id from product
//deletes cart items associated with the product_id from cart_item
//deletes the category associations in product_category
//callback: err

function deleteProduct(product_id, callback) {
    queries.deleteItemByPID(product_id, (err) => {
        if (err) { return callback(err); }
    });
    queries.deleteProdcatByPID(product_id, (err) => {
        if (err) { return callback(err); }
    });
    queries.deleteProductByPID(product_id, (err) => {
        if (err) { return callback(err); }
    });
    callback(null);
}

module.exports = { deleteProduct }