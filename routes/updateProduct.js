var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.post('/:id', (req, res) => {

    const {productId, name, price, description, image, quantity} = req.body
  
    queries.updateProd(name, price, description, image, quantity, productId, (err, result) => {
      if (err) {
        return next(err)
        // return res.status(500).json({ success: false, message: 'Error updating product', error: err.message });
      } else {
        res.json({ success: true, message: 'Product updated successfully', result: result });
      }
    });
  });

module.exports = router;
