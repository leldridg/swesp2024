
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
    if (err) { console.log(err); }

    if (valid) {

      generator.generateToken(username, (err, token) => {
        if (err) { console.log(err); }

        res.redirect(`/?session=${token}`);
      });

    } else {
      res.send('Account login failed');
    }
  });
});


module.exports = router;
