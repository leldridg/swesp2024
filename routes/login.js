
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {
  res.render('pages/login');
});

router.post('/', function(req, res) {

  const { username, password } = req.body; // Extracting username and password from the form submission

  // query for if username is already taken
  queries.loginValid(username, password, (err, valid) => {

    if(valid){
      res.send('Account login success');
    } else {
      res.send('Account login failed');
    }
  });
    
});

module.exports = router;
