
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {
  res.render('pages/create-account', { taken: false } );
});

router.post('/', function(req, res) {

  const { username, password } = req.body; // Extracting username and password from the form submission

  // query for if username is already taken
  queries.accountTaken(username, (err, taken) => {
    if(err) { console.log(err); }

    if(taken){  
      // res.send('Username already taken');
      res.render('pages/create-account', {taken: true, password: password});
    } else {
      
      // query to add a new user to the database
      queries.createAccount(username, password, (err, success) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred');
        }
        res.send('Account created successfully');
      });
    }

  });


});


module.exports = router;
