
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {
  res.render('pages/create-account');
});

router.post('/', function(req, res) {

  const { username, password } = req.body; // Extracting username and password from the form submission

  queries.createAccount(username, password, (err, success) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.send('Account created successfully');
  });

});


module.exports = router;
