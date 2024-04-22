
var express = require('express');
var router = express.Router();

const queries = require('../database/queries');

const userCart = require('../database/userCart');

const isAdmin = require('../database/isTokenAdmin');

router.get('/', function (req, res, next) {

  token = req.query.session || null;

  if(token == null){
    // res.render('pages/cart', { title: 'welcome, guest user!', items: {}, token: null, user_id: null});
    res.redirect('/');
  } else {
    queries.uidFromSID(req.query.session, (err, exists, user_id) => {
      if (err) { return next(err); }
      if (exists) {
        // gets username and cart items
        queries.usernameByUID(user_id, (err, username) => {
          if (err) { return next(err); }
          userCart.getUserCart(user_id, (err, items) => {
            if (err) { return next(err); }
            isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {
              if (err) { return next(err); }
              if (exists) {
                if (is_admin) {
                  res.redirect(`/?session=${token}`);
                } else {
                  res.render('pages/cart', { title: username, items: items, token:req.query.session, user_id: user_id});
                }
              } else {
                res.redirect(`/?session=${token}`);
              }
            });
          });
        });
      } else {
        res.send("invalid session token ):");
      }
    });
  }
});

router.post('/delete-item', function (req, res) {
  const { uid, pid, token } = req.body; //get user_id, product_id, and token from form

  queries.deleteItemByUIDPID(uid, pid, (err) => {
    res.redirect(`/cart/?session=${token}`);
  });

});

router.post('/update-quantity', function(req, res) {
  const { quantity, uid, pid, token } = req.body; //get info from form

  queries.updateItemQuantityByUIDPID(uid, pid, quantity, (err) => {
    res.redirect(`/cart/?session=${token}`);
  });
});

router.post('/nav', function(req, res) {
  const { quantity, token } = req.body;

  if (quantity > 0) {
    res.redirect(`/checkout/?session=${token}`);
  } else {
    res.status(400).send("Put an item in your cart first!");
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
