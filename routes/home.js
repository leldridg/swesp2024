
var express = require('express');
var router = express.Router();
const db = require('../db.js'); // Adjust the path as necessary


router.get('/', function (req, res, next) {

  res.render('pages/home', { title: 'Home Page', message: 'Welcome to my INDEX Express app!' });

});

module.exports = router;
