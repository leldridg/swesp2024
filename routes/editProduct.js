
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');
const deletethething = require('../database/deleteProduct')


router.get('/', function (req, res, next) {
  res.render('pages/edit-product');
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
    res.render('pages/edit-product', { item: item, productId: productId, token:token });

  });
});

module.exports = router;