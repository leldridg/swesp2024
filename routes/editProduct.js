
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pages/edit-product');
});

module.exports = router;