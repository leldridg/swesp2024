
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pages/view-product');
});

module.exports = router;