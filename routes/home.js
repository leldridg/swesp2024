
var express = require('express');
var router = express.Router();
const db = require('../db.js'); // Adjust the path as necessary


router.get('/', function (req, res, next) {

  let sql = `SELECT username, password 
			FROM account 
			WHERE username = 'test' AND password = 'password'`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    
    res.render('pages/home', { title: 'Home Page', message: 'Welcome to my INDEX Express app!' });
  });

});

module.exports = router;
