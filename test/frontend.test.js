const axios = require('axios');
const db = require('../database/db.js');
const queries = require('../database/queries.js');
const generator = require('../database/generateToken.js');

//having issues with db.query('BEGIN'); and db.query('ROLLBACK');

beforeEach(async () => {
    await db.query('BEGIN;');
});
  
afterEach(async () => {
    await db.query('ROLLBACK;');
});

//test that visiting each page without a token is handles gracefully

describe('test that visiting each page without a token is handled gracefully', () => {

    test('check server response code for home page', async () => {

        const url = 'http://localhost:3000/'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for create account page', async () => {
        const url = 'http://localhost:3000/create-account'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for login page', async () => {
        const url = 'http://localhost:3000/login'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for cart page', async () => {
        const url = 'http://localhost:3000/cart'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for view product page', async () => {
        const url = 'http://localhost:3000/view-product/1'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for checkout page', async () => {
        const url = 'http://localhost:3000/checkout'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for add product page', async () => {
        const url = 'http://localhost:3000/add-product'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for edit product page', async () => {
        const url = 'http://localhost:3000/edit-product/1'; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

});

//test that handling each page with an admin token is handled gracefully

describe('test that visiting each page with an admin token is handled gracefully', () => {

    test('check server response code for home page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/?session=${session_id}`; // Replace with your URL
        
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }

        //await db.query("ROLLBACK;");

    });

    test('check server response code for create account page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/create-account/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
        //await db.query("ROLLBACK;");
    });

    test('check server response code for login page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/login/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
        //await db.query("ROLLBACK;");
    });

    test('check server response code for cart page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/cart/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for view product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/view-product/1/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for checkout page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/checkout/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for add product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/add-product/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for edit product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('admin2', 2, TRUE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('admin', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/edit-product/1/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

});

//test that handling each page with a non-admin token is handled gracefully

describe('test that visiting each page with a non-admin token is handled gracefully', () => {

    test('check server response code for home page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/?session=${session_id}`; // Replace with your URL
        
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }

    });

    test('check server response code for create account page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/create-account/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for login page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/login/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for cart page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/cart/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for view product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/view-product/1/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for checkout page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/checkout/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for add product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });

        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/add-product/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

    test('check server response code for edit product page', async () => {

        //await db.query("BEGIN;");

        const session_id = 'testnonadminsession';

        const res = await db.query(`
        INSERT INTO account (username, password, is_admin, login_time)
        VALUES ('testbabyaccount', 1, FALSE, NOW())
        RETURNING user_id;
        `);

        const user_id = res.rows[0].user_id;
        
        // await db.query("ROLLBACK;");
        // await db.query("BEGIN;");

        queries.insertToken(session_id, user_id, (err) => {
            if (err) { console.error(err); }
        });
        // let session_id = '';

        // generator.generateToken('petlover123', (err, token) => {
        //     if (err) { console.error(err); }
        //     session_id = token;
        // });

        const url = `http://localhost:3000/edit-product/1/?session=${session_id}`; // Replace with your URL
        try {
            const response = await axios.get(url);
            console.log('Response Status Code:', response.status);
            expect(response.status).toBe(200); // Change the expected status code as needed
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });

});


