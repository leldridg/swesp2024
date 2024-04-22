
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');
const guestAccount = require('../database/guestAccount');
const isAdmin = require('../database/isTokenAdmin');

router.get('/', function (req, res, next) {
  return res.status(404).send('Product not found');
});

router.get('/:productId', (req, res) => {
  productId = req.params.productId;
  token = req.query.session || null;

  queries.productInfoFromPID(productId, (err, item) => {
    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send('Product not found');
    }

    if (token == null || token == undefined || token == "") {

      res.render('pages/view-product', { item: item, productId: productId, token: token, admin: false });

    } else {
      isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {
        if (err) { return next(err); }
        if (!exists) {
          res.send("invalid session token ):");
        } else {
          if (is_admin) {
            // res.redirect(`/?session=${token}`);

            res.redirect(`/edit-product/${productId}?session=${token}`);
          } else {
            res.render('pages/view-product', { item: item, productId: productId, token: token, admin: false });
          }
        }
      });
    }
  });
});

router.post('/', function (req, res, next) {
  const { productId, quantity, token } = req.body; // Extracting username and password from the form submission

  if (token == "" || token == null || token == undefined) {

    guestAccount.guestAccount(productId, quantity, (err, genToken) => {
      res.redirect(`/?session=${genToken}`);
    });
  } else {
    queries.uidFromSID(token, (err, exists, user_id) => {
      if (err) { return callback(err, null, null) }

      if (!exists) {
        res.send("invalid session token ):");
      }

      if (exists) {
        if(quantity < 0) { return res.status(400).send("Quantity should not be negative"); }

        queries.addItemToCart(user_id, productId, quantity, (err) => {
          if (err) {
            return next(err);
          } else {
            res.redirect(`/?session=${token}`);
          }
        });
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
