
var express = require('express');
var router = express.Router();

const func = require('../database/isTokenAdmin');
const checkout = require('../database/checkout');
const queries = require('../database/queries');

router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length != 0) {

    const token = req.query.session || null;

    if (token == null || token == undefined || token == "") {
      res.send("invalid session token ):");
    }
    func.isTokenAdmin(token, (err, exists, is_admin) => {
      if (err) { return next(err); }
      if (exists && is_admin) {
        res.redirect(`/?session=${token}`);
      } else {
        res.render('pages/checkout', { admin: false, token: token });
      }
    });
  } else {
    res.send("invalid session token ):");
  }
});

router.post('/', function (req, res, next) {
  const { token, firstName, lastName, cardNumber, expirationDate, cvv, address, city, state, zip } = req.body;
  if (firstName.trim() === "" || lastName.trim() === "" || address.trim() === "" || city.trim() === "" || state.trim() === "") {
    res.redirect(`/checkout/?session=${token}`)
  } else {
    queries.uidFromSID(token, (err, exists, user_id) => {
      if(err){
        return next(err);
      }
      if(!exists){
        res.send("invalid session token ):");
      } else {
      checkout.checkout(user_id, (err) => {
        if(err) { return next(err); }
        res.redirect(`/?session=${token}&message=${"checkout successful!"}`);
      })
    }
    });
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