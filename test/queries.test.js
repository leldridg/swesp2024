const queries = require('../database/queries.js');
const db = require('../database/db.js');

beforeEach(async () => {
    await db.query('BEGIN;');
});
  
afterEach(async () => {
    await db.query('ROLLBACK;');
});

describe('test that queries run successfully on the database (basic tests)', () => {

    //add test product to database
    //use fetchProducts to see that new item is there, to get product_id and quantity

    test('addProduct should add a product to the product table; fetchAllProducts should retrieve a list of all products to verify this', async () => {

        //let product_id = null;
        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
    
        //add product
        queries.addProduct(name, img, price, quantity, desc, (err) => {
            //ensure addProduct succeeds
            expect(err).toBeNull();

            queries.fetchAllProducts((err, products) => {
                //ensure fetchProducts succeeds
                expect(err).toBeNull();

                expect(products).not.toBeNull();
                expect(products.length).toBeGreaterThan(0);

                //find the newly added product in the product list
                const addedProduct = products.find(product => product.name === name);

                //assert product has the right details
                expect(addedProduct).toBeDefined();
                expect(addedProduct.name).toBe(name);
                expect(addedProduct.image).toBe(img);
                expect(addedProduct.price).toBe(price);
                expect(addedProduct.quantity).toBe(quantity);
                expect(addedProduct.description).toBe(desc);

                //ensure product_id is present
                expect(addedProduct.product_id).toBeDefined();
            });
        });
    });

    test('fetchVisibleProducts should retrieve a list of the products that are not considered deleted', async () => {

        await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('Deleted Product', 'https://cs.trinity.edu/~leldridg/images/logo.jpeg', 'true','https://cs.trinity.edu/~leldridg/images/logo.jpeg', '1.99', '5', 'This product is deleted.');
        `);

        queries.fetchVisibleProducts((err, products) => {
            // Ensure fetchVisibleProducts succeeds
            expect(err).toBeNull();

            // Ensure products array is not empty
            expect(products).not.toBeNull();

            // Check that all products have is_deleted attribute false
            products.forEach(product => {
                expect(product.is_deleted).toBe(false);
            });
        });

    });

    //use productInfoFromPID to ensure that PID is correct and info matches
    test('productInfoFromPID should return info that matches test product', async () => {

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        queries.productInfoFromPID(product_id, (err, productInfo) => {
            //ensure function call succeeds
            expect(err).toBeNull();

            //assert that productInfo is not null and that it contains the correct info
            expect(productInfo).toBeDefined();
            expect(productInfo.name).toBe(name);
            expect(productInfo.price).toBe(price);
            expect(productInfo.quantity).toBe(quantity);
            expect(productInfo.description).toBe(desc);
            expect(productInfo.image).toBe(img);
            //expect(productInfo.is_deleted).toBe(is_deleted);
            //currently not expecting is_deleted to be returned from
        });
    });

    //get quantity of test item, make sure it is equal to assigned quantity
    test('getProdQuantity should return the correct quantity for a product_id', async () => {

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        queries.getProdQuantity(product_id, (err, productQuantity) => {
            
            //ensure query succeeds
            expect(err).toBeNull();

            //assert productQuantity is defined and equals the expected quantity
            expect(productQuantity).toBeDefined();
            expect(productQuantity).toBe(quantity);
        });

    });

    //update quantity of test item, use get quantity to make sure it updates correctly
    test('updateProdQuantity should correctly update the quantity of a product; getProdQuantity should retrieve updated quantity correctly', async () => {

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        //define new quantity
        const newQuantity = quantity + 5;

        queries.updateProdQuantity(product_id, newQuantity, (err) => {
            //ensure query succeeds
            expect(err).toBeNull();

            queries.getProdQuantity(product_id, (err, updatedQuantity) => {
                //ensure query succeeds
                expect(err).toBeNull();

                //assert quantity has been updated correctly
                expect(updatedQuantity).toBe(newQuantity);
            });
        });
    });

    //add item to cart(s)
    //use cartItemsbyUID to ensure item is added to carts successfully
    test('addItemToCart should add an item to a cart correctly; cartItemsbyUID should retrieve the cart items for a user correctly', async () => {

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        const res2 = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res2.rows[0].user_id;

        queries.addItemToCart(user_id, product_id, quantity, (err) => {
            //ensure query succeeds
            expect(err).toBeNull();

            //retrieve cart items for user
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                //ensure query succeeds
                expect(err).toBeNull();
                expect(cartItems.length).toBe(1);

                const addedItem = cartItems[0];
                //const addedItem = cartItems.find(item => item.product_id === product_id);
                expect(addedItem).toBeDefined();
                expect(addedItem.quantity).toBe(quantity);
            });

        });
    });

    //updateProd
    test('updateProd should update the attributes associated with a product correctly; productInfofromPID should return updated product info', async () => {

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        const newName = 'Updated Dev Test Product';
        const newImg = 'https://cs.trinity.edu/~leldridg/images/prof1.png';
        const newPrice = 11.99;
        const newQuantity = 10;
        const newDesc = 'This is an updated decsription for a test product.';

        queries.updateProd(newName, newPrice, newDesc, newImg, newQuantity, product_id, (err) => {

            expect(err).toBeNull();

            queries.productInfoFromPID(product_id, (err, productInfo) => {
                //ensure function call succeeds
                expect(err).toBeNull();
    
                //assert that productInfo is not null and that it contains the correct info
                expect(productInfo).toBeDefined();
                expect(productInfo.name).toBe(newName);
                expect(productInfo.price).toBe(newPrice);
                expect(productInfo.quantity).toBe(newQuantity);
                expect(productInfo.description).toBe(newDesc);
                expect(productInfo.image).toBe(newImg);
            });
        });
    });

    //username by user_id
    test('usernameByUID should retrieve the username associated with a user_id correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        queries.usernameByUID(user_id, (err, retUsername) => {
            expect(err).toBeNull();
            expect(retUsername).toBeDefined();
            expect(retUsername).toBe(username);
        });
    });

    //user_id by username
    test('idByUsername should retrieve the user_id associated with a username correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const expected_user_id = res.rows[0].user_id;

        queries.idByUsername(username, (err, user_id) => {
            expect(err).toBeNull();
            expect(user_id).toBeDefined();
            expect(user_id).toBe(expected_user_id);
        })
    });

    //adminFromUID
    test('adminFromUID should retrieve the value of the is_admin boolean associated with a user_id correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        queries.adminFromUID(user_id, (err, exists, is_admin) => {
            expect(err).toBeNull();
            expect(exists).toBeDefined();
            expect(exists).toBe(true);
            expect(is_admin).toBeDefined();
            expect(is_admin).toBe(false);
        });

    });

    //loginValid
    test('loginValid should return a boolean telling the user whether or not they entered a valid username/password combination', async () => {

        const username = 'testbabyaccount';
        const password = '1';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', '${password}', FALSE, NOW())
        `);
        
        queries.loginValid(username, password, (err, is_valid) => {
            expect(err).toBeNull();
            expect(is_valid).toBeDefined();
            expect(is_valid).toBe(true);
        });

    });

    //createAccount
    //accountTaken
    test('createAccount should create an account with the defined username/password if the username is not taken; accountTaken should return true if there is an acc with the username', async () => {
        const username = 'testbabyaccount';
        const password = '1';

        queries.accountTaken(username, (err, is_taken) => {
            expect(err).toBeNull();
            expect(is_taken).toBeDefined();
            expect(is_taken).toBe(false);
        });

        queries.createAccount(username, password, (err) => {
            expect(err).toBeNull();

            queries.accountTaken(username, (err, is_taken) => {
                expect(err).toBeNull();
                expect(is_taken).toBeDefined();
                expect(is_taken).toBe(true);
            })
        });
    });

    //checkTokenUnique
    //insertToken
    test('checkTokenUnique should return a boolean indicating whether or not a token is unique; insertToken should insert a new token for a user', async () => {
        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        const session_id = 'testchecktokenunique';

        queries.checkTokenUnique(session_id, (err, is_unique) => {
            expect(err).toBeNull();
            expect(is_unique).toBeDefined;
            expect(is_unique).toBe(true);
        });

        queries.insertToken(session_id, user_id, (err) => {
            expect(err).toBeNull();
            queries.checkTokenUnique(session_id, (err, is_unique) => {
                expect(err).toBeNull();
                expect(is_unique).toBeDefined();
                expect(is_unique).toBe(false);
            });
        });
    });

    //removeToken
    //checkTokenUnique
    test('removeToken should remove any tokens associated with a user_id; checkTokenUnique should return a boolean indicating whether or not a token is unique', async () => {
        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);


        const user_id = res.rows[0].user_id;

        const session_id = 'testremovetoken';

        await db.query(`
        INSERT INTO session (session_id, user_id)
        VALUES ('${session_id}', '${user_id}');
        `);

        queries.checkTokenUnique(session_id, (err, is_unique) => {
            expect(err).toBeNull();
            expect(is_unique).toBeDefined;
            expect(is_unique).toBe(false);
        });

        queries.removeToken(user_id, (err) => {
            expect(err).toBeNull();
            queries.checkTokenUnique(session_id, (err, is_unique) => {
                expect(err).toBeNull();
                expect(is_unique).toBeDefined();
                expect(is_unique).toBe(true);
            });
        });
    });

    //uidfromsuid
    test('uidFromSID should return the user_id associated with a specified session_id/token', async () => {
        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);


        const user_id = res.rows[0].user_id;

        const session_id = 'testuidfromsid';

        await db.query(`
        INSERT INTO session (session_id, user_id)
        VALUES ('${session_id}', '${user_id}');
        `);

        queries.uidFromSID(session_id, (err, exists, user_id) => {
            expect(err).toBeNull();
            expect(exists).toBeDefined();
            expect(exists).toBe(true);
            expect(user_id).toBeDefined();
            expect(user_id).toBe(user_id);
        })
    });

    //addChangeLog
    //viewChangeLog
    test('addChangeLog should add a new audit to a specified product changelog; viewChangeLog should return the changelog associated with a specified product', async () => {
        
        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const res2 = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res2.rows[0].user_id;

        const product_id = res.rows[0].product_id;

        queries.addChangeLog('add', product_id, user_id, (err) => {
            expect(err).toBeNull();
            queries.viewChangeLog(product_id, (err, changes) => {
                expect(err).toBeNull();
                expect(changes).toBeDefined();
                expect(changes.length).toBe(1);
            })
        });

    });

    //update quantity of item in cart !! need to add query for??

    //remove item from cart based on user_id and product_id
    test('deleteItemByUIDPID should remove an item from a user cart based on user_id and product_id correctly; cartItemsByUID should retrieve cart items correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res2 = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res2.rows[0].product_id;

        await db.query(`
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ('${user_id}', '${product_id}', ${quantity});
        `);

        queries.cartItemsbyUID(user_id, (err, cartItems) => {
            expect(err).toBeNull();
            expect(cartItems).toBeDefined();
            expect(cartItems.length).toBe(1);
        });

        queries.deleteItemByUIDPID(user_id, product_id, (err) => {
            expect(err).toBeNull();
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                expect(err).toBeNull();
                expect(cartItems).toBeDefined();
                expect(cartItems.length).toBe(0);
            });
        });
    });

    //remove item from cart based on item_id
    test('deleteItemByIID should remove an item from a user cart based on item_id correctly; cartItemsByUID should retrieve cart items correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res2 = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res2.rows[0].product_id;

        const res3 = await db.query(`
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ('${user_id}', '${product_id}', ${quantity})
        RETURNING item_id;
        `);

        const item_id = res3.rows[0].item_id;

        queries.cartItemsbyUID(user_id, (err, cartItems) => {
            expect(err).toBeNull();
            expect(cartItems).toBeDefined();
            expect(cartItems.length).toBe(1);
        });

        queries.deleteItemByIID(item_id, (err) => {
            expect(err).toBeNull();
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                expect(err).toBeNull();
                expect(cartItems).toBeDefined();
                expect(cartItems.length).toBe(0);
            });
        });
    });

    //remove item from cart(s) based on product_id
    test('deleteItemByPID should remove an item from user carts based on product_id correctly; cartItemsByUID should retrieve cart items correctly', async () => {

        const username = 'testbabyaccount';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('${username}', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;

        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res2 = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res2.rows[0].product_id;

        await db.query(`
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ('${user_id}', '${product_id}', ${quantity});
        `);

        queries.cartItemsbyUID(user_id, (err, cartItems) => {
            expect(err).toBeNull();
            expect(cartItems).toBeDefined();
            expect(cartItems.length).toBe(1);
        });

        queries.deleteItemByPID(product_id, (err) => {
            expect(err).toBeNull();
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                expect(err).toBeNull();
                expect(cartItems).toBeDefined();
                expect(cartItems.length).toBe(0);
            });
        });
    });

    test('deleteProductByPID should successfully mark a product as deleted; fetchAllProducts should fetch products, including those marked as deleted', async () => {
        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        queries.deleteProductByPID(product_id, (err) => {
            expect(err).toBeNull();
            
            queries.fetchAllProducts((err, products) => {
                //ensure fetchProducts succeeds
                expect(err).toBeNull();

                expect(products).not.toBeNull();
                expect(products.length).toBeGreaterThan(0);

                //find the newly added product in the product list
                const addedProduct = products.find(product => product.product_id === product_id);

                //assert product has the right details
                expect(addedProduct).toBeDefined();
                expect(addedProduct.is_deleted).toBe(true);
            });
        });
    });

    test('updateItemQuantityByUIDPID should correctly update the quantity associated with a specified cart_item; cartItemsByUID should correctly retrieve cart items', async () => {
        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        const res2 = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res2.rows[0].user_id;

        await db.query(`
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ('${user_id}', '${product_id}', ${quantity});
        `);

        queries.updateItemQuantityByUIDPID(user_id, product_id, 2, (err) => {
            expect(err).toBeNull();

            //retrieve cart items for user
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                //ensure query succeeds
                expect(err).toBeNull();
                expect(cartItems.length).toBe(1);

                const addedItem = cartItems[0];
                //const addedItem = cartItems.find(item => item.product_id === product_id);
                expect(addedItem).toBeDefined();
                expect(addedItem.quantity).toBe(2);
            });

        });
    });

    test('updateItemQuantityByIID should correctly update the quantity associated with a specified cart_item; cartItemsByUID should correctly retrieve cart items', async () => {
        const name = 'Dev Test Product';
        const img = 'https://cs.trinity.edu/~leldridg/images/logo.jpeg';
        const price = 10.99;
        const quantity = 5;
        const desc = 'This is a decsription for a test product.';
        const is_deleted = false;

        const res = await db.query(`
        INSERT INTO product (name, image, is_deleted, thumbnail, price, quantity, description)
        VALUES ('${name}', '${img}', '${is_deleted}','${img}', '${price}', '${quantity}', '${desc}')
        RETURNING product_id;
        `);

        const product_id = res.rows[0].product_id;

        const res2 = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res2.rows[0].user_id;

        const res3 = await db.query(`
        INSERT INTO cart_item (user_id, product_id, quantity)
        VALUES ('${user_id}', '${product_id}', ${quantity})
        RETURNING item_id;
        `);

        const item_id = res3.rows[0].item_id;

        queries.updateItemQuantityByIID(item_id, 2, (err) => {
            expect(err).toBeNull();

            //retrieve cart items for user
            queries.cartItemsbyUID(user_id, (err, cartItems) => {
                //ensure query succeeds
                expect(err).toBeNull();
                expect(cartItems.length).toBe(1);

                const addedItem = cartItems[0];
                //const addedItem = cartItems.find(item => item.product_id === product_id);
                expect(addedItem).toBeDefined();
                expect(addedItem.quantity).toBe(2);
            });

        });
    });

});