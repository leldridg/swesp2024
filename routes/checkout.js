
var express = require('express');
var router = express.Router();

const func = require('../database/isTokenAdmin');

router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length != 0) {
    func.isTokenAdmin(req.query.session, (err, exists, is_admin) => {
      if (err) { return next(err); }
      if (exists && is_admin) {
        res.redirect(`/?session=${req.query.session}`);
      } else {
        res.render('pages/checkout');
      }
    });
  } else {
    res.render('pages/checkout');
  }
});

module.exports = router;