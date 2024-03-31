
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {

  const sessionToken = req.query.session || null;

  queries.fetchProducts((err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.render('pages/home', { title: "Home!", items: items});
  });
  
});


module.exports = router;
