
var express = require('express');
var router = express.Router();

const mid = require('../database/middleware.js');

router.get('/', async function (req, res, next) {

  var uid = await mid.userIDfromSession(req.query.session)

  console.log(uid);
  res.render('pages/home', { title: uid, items: null});

});


module.exports = router;
