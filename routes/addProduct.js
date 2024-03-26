
var express = require('express');
var router = express.Router();

const func = require('../database/isTokenAdmin');

//test!!
router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length != 0) {
    func.isTokenAdmin(req.query.session, (err, exists, is_admin) => {
      if (err) { return next(err); }
      if (exists && is_admin) {
        res.render('pages/add-product');
      } else {
        res.redirect(`/?session=${req.query.session}`);
      }
    });
  } else {
    res.redirect('pages/home');
  }
});

module.exports = router;