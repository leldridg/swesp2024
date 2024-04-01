const queries = require('../database/queries.js');
//const db = require('../database/db.js');

//test('test test')

describe('testing queries, which expect good inputs', () => {

    test('test test', (done) => {
        expect(1).toBe(1);
        done();
    });

    // //test product details
    // let product_id = null;
    // const name = 'Dev Test Product';
    // const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
    // const price = 10.99;
    // const quantity = 5;
    // const desc = 'This is a decsription for a test product.';

    //add test product to database
    //use fetchProducts to see that new item is there, to get product_id and quantity
    // test('addProduct should add a product to the product table', (done) => {
    //     //add product
    //     queries.addProduct(name, img, price, quantity, desc, (err) => {
    //         //ensure addProduct succeeds
    //         expect(err).toBeNull();

    //         queries.fetchProducts((err, products) => {
    //             //ensure fetchProducts succeeds
    //             expect(err).toBeNull();

    //             console.log(products);

    //             //find the newly added product in the product list
    //             const addedProduct = products.find(product => product.name === name);

    //             //assert product has the right details
    //             expect(addedProduct).toBeDefined();
    //             expect(addedProduct.name).toBe(name);
    //             expect(addedProduct.img).toBe(img);
    //             expect(addedProduct.price).toBe(price);
    //             expect(addedProduct.quantity).toBe(quantity);
    //             expect(addedProduct.desc).toBe(desc);

    //             //ensure product_id is present
    //             expect(addedProduct.product_id).toBeDefined();

    //             console.log(addedProduct.product_id);
                
    //             //set undefined global test var
    //             product_id = addedProduct.product_id;

    //             //complete test
    //             done();
    //         });
    //     });
    // });

    // console.log('Product ID: ' + product_id);

    // //use productInfoFromPID to ensure that PID is correct and info matches
    // test('productInfoFromPID should return info that matches test product', (done) => {
    //     queries.productInfoFromPID(product_id, (err, productInfo) => {
    //         //ensure function call succeeds
    //         expect(err).toBeNull();

    //         //assert that productInfo is not null and that it contains the correct info
    //         expect(productInfo).toBeDefined();
    //         expect(productInfo.name).toBe(name);
    //         expect(productInfo.price).toBe(price);
    //         expect(productInfo.quantity).toBe(quantity);
    //         expect(productInfo.description).toBe(desc);
    //         expect(productInfo.image).toBe(img);

    //         //complete test
    //         done();
    //     });
    // });

    // //get quantity of test item, make sure it is equal to assigned quantity
    // test('getProdQuantity should return the correct quantity for a product_id', (done) => {
    //     queries.getProdQuantity(product_id, (err, productQuantity) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         //assert productQuantity is defined and equals the expected quantity
    //         expect(productQuantity).toBeDefined();
    //         expect(productQuantity).toBe(quantity);

    //         //complete test
    //         done();
    //     });
    // });

    // //update quantity of test item, use get quantity to make sure it updates correctly
    // test('updateProdQuantity should correctly update the quantity of a product', (done) => {
    //     //define new quantity
    //     const newQuantity = quantity + 5;

    //     queries.updateProdQuantity(product_id, newQuantity, (err) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         queries.getProdQuantity(product_id, (err, updatedQuantity) => {
    //             //ensure query succeeds
    //             expect(err).toBeNull();

    //             //assert quantity has been updated correctly
    //             expect(updatedQuantity).toBe(newQuantity);

    //             //complete test
    //             done();
    //         });
    //     });
    // });

    // //add item to cart(s)
    // //use cartItemsbyUID to ensure item is added to carts successfully
    // //assumes existence of user petlover123
    // test('addItemToCart should add an item to a cart correctly', (done) => {
    //     const test_user = 'petlover123';
    //     const test_quantity = 1;
    //     queries.idByUsername(test_user, (err, user_id) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         //ensure user_id is defined
    //         expect(user_id).toBeDefined();

    //         queries.addItemToCart(user_id, product_id, test_quantity, (err) => {
    //             //ensure query succeeds
    //             expect(err).toBeNull();

    //             //retrieve cart items for user
    //             queries.cartItemsbyUID(user_id, (err, cartItems) => {
    //                 //ensure query succeeds
    //                 expect(err).toBeNull();

    //                 const addedItem = cartItems.find(item => item.product_id === product_id);
    //                 expect(addedItem).toBeDefined();
    //                 expect(addedItem.quantity).toBe(test_quantity);

    //                 //complete test
    //                 done();
    //             })
    //         })
    //     })
    // })

    // //update quantity of item in cart !! need to add query for??

    // //remove item from cart based on user_id and product_id
    // //assumes existence of user furryfriend22
    // test('deleteItemByUIDPID should remove an item from a user cart correctly', (done) => {
    //     const test_user = 'furryfriend22';
    //     const test_quantity = 1;
    //     queries.idByUsername(test_user, (err, user_id) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         //ensure user_id is defined
    //         expect(user_id).toBeDefined();

    //         queries.addItemToCart(user_id, product_id, test_quantity, (err) => {
    //             //ensure query succeeds
    //             expect(err).toBeNull();

    //             queries.deleteItemByUIDPID(user_id, product_id, (err) => {
    //                 //ensure query succeeds
    //                 expect(err).toBeNull();

    //                 //retrieve cart items using
    //                 cartItemsbyUID(user_id, (err, cartItems) => {
    //                     //ensure query succeeds
    //                     expect(err).toBeNull();

    //                     //make sure deleted item is not in cartItems
    //                     const deletedItem = cartItems.find(item => item.product_id === product_id);
    //                     expect(deletedItem).toBeUndefined();

    //                     //complete test
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    // });

    // //remove item from cart by item id
    // //assumes existence of user furryfriend22
    // test('addItemToCart should add an item to a cart correctly', (done) => {
    //     const test_user = 'furryfriend22';
    //     const test_quantity = 1;
    //     queries.idByUsername(test_user, (err, user_id) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         //ensure user_id is defined
    //         expect(user_id).toBeDefined();

    //         queries.addItemToCart(user_id, product_id, test_quantity, (err) => {
    //             //ensure query succeeds
    //             expect(err).toBeNull();

    //             queries.cartItemsbyUID(user_id, (err, cartItems) => {
    //                 //ensure query succeeds
    //                 expect(err).toBeNull();

    //                 const addedItem = cartItems.find(item => item.product_id === product_id);
    //                 expect(addedItem).toBeDefined();

    //                 queries.deleteItemByIID(addedItem.item_id, (err) => {
    //                     //ensure query succeeds
    //                     expect(err).toBeNull();
    
    //                     //retrieve cart items using
    //                     cartItemsbyUID(user_id, (err, cartItems) => {
    //                         //ensure query succeeds
    //                         expect(err).toBeNull();
    
    //                         //make sure deleted item is not in cartItems
    //                         const deletedItem = cartItems.find(item => item.product_id === product_id);
    //                         expect(deletedItem).toBeUndefined();
    
    //                         //complete test
    //                         done();
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });

    // //delete product (from cart and product table using deleteProduct.js)
    // //uses deleteProductByPID, deleteProdcatByPID, and deleteItemByPID
    // test('deleteProduct should correctly delete any trace of a product', (done) => {
    //     deleteProduct(product_id, (err) => {
    //         //ensure query succeeds
    //         expect(err).toBeNull();

    //         //verify that associated records have been deleted from database
    //         db.query('SELECT * FROM product WHERE product_id = $1', [product_id], (err, result) => {
    //             //ensure product has been deleted
    //             expect(result.rows.length).toBe(0);

    //             db.query('SELECT * FROM cart_item WHERE product_id = $1', [product_id], (err, result) => {
    //                 //ensure cart items have been deleted
    //                 expect(result.rows.length).toBe(0);

    //                 db.query('SELECT * FROM product_category WHERE product_id = $1', [product_id], (err, result) => {
    //                     //ensure category associations have been deleted
    //                     expect(result.rows.length).toBe(0);

    //                     //complete test
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    // });

    //adminFromUID

    //usernameByUID

    //uidFromSID

    //insertToken

    //checkTokenUnique

    //removeToken

    //loginValid

    //accountTaken

    //createAccount

    //isTokenAdmin

    //userCart

    //generateToken

    //checkout (add cart items to a user and then test via that way?)

});