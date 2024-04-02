
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');
const guestAccount = require('../database/guestAccount');

router.get('/', function (req, res, next) {
  res.render('pages/view-product');
});

router.get('/:productId', (req, res) => {
  productId = req.params.productId;
  token = req.query.session;

  queries.productInfoFromPID(productId, (err, item) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    if (!item) {
      // No product found for the given ID
      return res.status(404).send('Product not found');
    }

    // Render the view-product.ejs template with the item object
    res.render('pages/view-product', { item: item, productId: productId, token: token });

  });
});

router.post('/', function (req, res) {
  const { productId, quantity, token } = req.body; // Extracting username and password from the form submission


  if (token == "" || token == null || token == undefined) {

    console.log("guest addition");
    guestAccount.guestAccount((err) => { });

    console.log(token);
    queries.uidFromSID(token, (err, exists, user_id) => {

    if(err){return callback(err); }
    if(!exists){
      console.log("token doesn't exist");
    }
    if(exists){
    queries.addItemToCart(user_id, productId, quantity, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send('An error occurred');
      } else {
        console.log("this code has ran and redirected");
        res.redirect(`/?session=${genToken}`);
      }
    });
  }
  console.log("this ran!.........");
  });

  } else {

    queries.uidFromSID(token, (err, exists, user_id) => {
      if (err) { return callback(err, null, null) }

      if (!exists) {
        res.send("invalid session token ):");
      }

      if (exists) {
        queries.addItemToCart(user_id, productId, quantity, (err) => {
          if (err) {
            console.log(err)
            return res.status(500).send('An error occurred');
          } else {
            res.redirect(`/?session=${token}`);
          }
        });
      }
    });
  }
});




module.exports = router;
