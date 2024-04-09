var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.post('/update-product/:id', (req, res) => {
    const productId = req.params.id;
    const name = req.params.name;
    const price = req.params.price;
    const description = req.params.description;
    const image = req.params.image;
    const quantity = req.params.quantity;

  
    queries.updateProd(name, price, description, image, quantity, productId, (err, result) => {
      if (err) {
        // If an error occurs, send a 500 status code and the error message
        return res.status(500).json({ success: false, message: 'Error updating product', error: err.message });
      }
      // If successful, send a success response
      res.json({ success: true, message: 'Product updated successfully', result: result });
    });
  });

module.exports = router;
