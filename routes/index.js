var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.error(__dirname);

  res.render('index', { title: 'Express', info: 'w'});

});

module.exports = router;
