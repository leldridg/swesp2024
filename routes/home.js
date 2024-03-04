
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {

  queries.fetchProducts((err, items) => {
    res.render('pages/home', { title: "Home!", items: items });
  });

});


module.exports = router;
