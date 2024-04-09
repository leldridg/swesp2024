
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

const generator = require('../database/generateToken');

router.get('/', function (req, res, next) {
  res.render('pages/login');
});

router.post('/', function (req, res) {

  const { username, password } = req.body; // Extracting username and password from the form submission

  queries.loginValid(username, password, (err, valid) => {
    if (err) { return next(err) }
    if (valid) {
      generator.generateToken(username, (err, token) => {
        if (err) { return next(err) }
        res.redirect(`/?session=${token}`);
      });

    } else {
      res.send('Account login failed');
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
