
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');


router.get('/', function (req, res, next) {
  res.render('pages/view-product');
});

router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  
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
    res.render('pages/view-product', { item: item });
  });
});



module.exports = router;
