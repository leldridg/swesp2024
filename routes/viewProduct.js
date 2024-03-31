
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');


router.get('/', function (req, res, next) {
  res.render('pages/view-product');
});

router.get('/:productId', (req, res) => {
  productId = req.params.productId;
  token = req.query.session;

  console.log("product id: " + productId);
  console.log("token: " + token);

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
    res.render('pages/view-product', { item: item, productId: productId, token:token });

  });
});

router.post('/', function (req, res) {
  const { productId, quantity, token} = req.body; // Extracting username and password from the form submission

  console.log("product id: " + productId);
  console.log("token: " + token);
  console.log("quantity: " + quantity);
  queries.uidFromSID(token, (err, exists, user_id) => {
    if (err) { return callback(err, null, null) }

    if (!exists) {
      console.log("invalid session token");
      res.send("invalid session token ):");
    }

    console.log("user id: " + user_id);

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


  console.log("this ran!");
});




module.exports = router;
