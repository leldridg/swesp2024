
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {
  res.render('pages/login');
});

router.post('/', function(req, res) {

  const { username, password } = req.body; // Extracting username and password from the form submission

  queries.loginValid(username, password, (err, valid) => {
    if(err) { console.log(err); }

    if(valid){

      queries.idByUsername(username, (err,result) => {
        if(err) { console.log(err); }

        const generateRandomAlphanumeric = length => Array.from({length}, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join('');

          let sess = generateRandomAlphanumeric(20);

          // remove the token if it exists
          queries.removeToken(result.user_id, (err) =>{
            if(err) { console.log(err); }
          });

          queries.checkTokenUnique(sess, (err,valid) =>{
            if(err) { console.log(err); }

            if(valid){

              queries.insertToken(sess, result.user_id, (err) =>{
                if(err) { console.log(err); }
              });
              console.log(`/?session=${sess}`);
              res.redirect(`/?session=${sess}`);
            } else {
              console.log('non unique token created');
            }
        });
      });

    } else {
      res.send('Account login failed');
    }
  });  
});

module.exports = router;
