
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pages/add-product');
});

module.exports = router;