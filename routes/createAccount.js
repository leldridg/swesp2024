
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

const generator = require('../database/generateToken');


router.get('/', function (req, res, next) {
  res.render('pages/create-account', { taken: false } );
});
router.post('/', function(req, res, next) { // Include 'next' in the function parameters

  const { username, password } = req.body; // Extracting username and password from the form submission

  // query for if username is already taken
  queries.accountTaken(username, (err, taken) => {
    if (err) { return next(err); }

    if (taken || username.includes("guest")) {  
      // Username already taken, render the page with a flag and the submitted password
      res.render('pages/create-account', {taken: true, password: password});
    } else {
      
      queries.createAccount(username, password, (err, success) => {
        if (err) { return next(err); }
        // If the account is successfully created, send a success message
        generator.generateToken(username, (err, token) => {
          if (err) { return next(err) }

          res.redirect(`/?session=${token}`);
        });
      });
    }
  });
});

// Error-handling middleware
router.use((err, req, res, next) => {
  console.error(err); // Log the error information for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server.' : err.message;
  res.status(statusCode).json({ error: message });
});



module.exports = router;
