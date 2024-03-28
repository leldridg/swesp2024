
var express = require('express');
var router = express.Router();

const queries = require('../database/queries');

const userCart = require('../database/userCart');

router.get('/', function (req, res, next) {

  console.log(req.query);

  res.render('pages/home');

});

// Error-handling middleware
router.use((err, req, res, next) => {
  console.error(err); // Log the error information for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server.' : err.message;
  res.status(statusCode).json({ error: message });
});

module.exports = router;
