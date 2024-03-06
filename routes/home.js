
var express = require('express');
var router = express.Router();

const queries = require('../database/queries');

const userCart = require('../database/userCart');

router.get('/', async function (req, res, next) {

  console.log(req.query);

  if(Object.keys(req.query).length === 0){
    res.render('pages/home', { title: 'home, no token!', items: null});
  } else {
    queries.uidFromSID(req.query.session, (err, exists, user_id) => {
      if (err) { return next(err); }

      if(exists){
        queries.usernameByUID(user_id, (err,username) => {
          userCart.getUserCart(user_id, (err, items) => {
            
            res.render('pages/home', { title: `welcome ${username}`, items: items});
          });
        });
      } else {
        console.log("invalid session token");
        res.send("invalid session token ):");
      }
    });
  }

});

// Error-handling middleware
router.use((err, req, res, next) => {
  console.error(err); // Log the error information for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server.' : err.message;
  res.status(statusCode).json({ error: message });
});

module.exports = router;
