var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.post('/:id', (req, res) => {

    const {productId, name, price, description, image, quantity} = req.body
  
    queries.updateProd(name, price, description, image, quantity, productId, (err, result) => {
      if (err) {
        // If an error occurs, send a 500 status code and the error message
        return res.status(500).json({ success: false, message: 'Error updating product', error: err.message });
      }
      res.json({ success: true, message: 'Product updated successfully', result: result });
    });
  });

module.exports = router;
