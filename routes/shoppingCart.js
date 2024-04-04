
var express = require('express');
var router = express.Router();

const queries = require('../database/queries');

const userCart = require('../database/userCart');

const isAdmin = require('../database/isTokenAdmin');

router.get('/', function (req, res, next) {

  token = req.query.session || null;

  if(Object.keys(req.query).length === 0){
    res.render('pages/cart', { title: 'welcome, guest user!', items: null, token: null});
  } else {
    queries.uidFromSID(req.query.session, (err, exists, user_id) => {
      if (err) { return next(err); }
      if(exists){
        // gets username and cart items
        queries.usernameByUID(user_id, (err,username) => {
          if (err) { return next(err); }
          userCart.getUserCart(user_id, (err, items) => {
            if (err) { return next(err); }
            isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {
              if (err) { return next(err); }
              if(exists){
                if(is_admin){
                  res.redirect(`/?session=${token}`);
                } else {
                  res.render('pages/cart', { title: username, items: items, token:req.query.session});
                }
              } else {
                res.redirect(`/?session=${token}`);
              }
            });

            // res.render('pages/cart', { title: username, items: items, token:req.query.session});
          });
        });
      } else {
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
