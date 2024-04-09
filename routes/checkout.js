
var express = require('express');
var router = express.Router();

const func = require('../database/isTokenAdmin');

router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length != 0) {

    const token = req.query.session || null;

    if(token == null || token == undefined || token == ""){
      res.send("invalid session token ):");
    }
    func.isTokenAdmin(token, (err, exists, is_admin) => {
      if (err) { return next(err); }
      if (exists && is_admin) {
        res.redirect(`/?session=${token}`);
      } else {
        res.render('pages/checkout', {admin: false, token: token});
      }
    });
  } else {
    res.send("invalid session token ):");
  }
});

// Error-handling middleware
router.use((err, req, res, next) => {
  console.error(err); // Log the error information for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server.' : err.message;
  res.status(statusCode).json({ error: message });
});

module.exports = router;