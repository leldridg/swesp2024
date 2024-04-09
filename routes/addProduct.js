
var express = require('express');
var router = express.Router();

const isAdmin = require('../database/isTokenAdmin');
const queries = require('../database/queries');


router.get('/', function (req, res, next) {

  const token = req.query.session || null;

  if(token == null || token == undefined || token == ""){
    res.redirect(`/`);
  }

  isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {
    if(err){ next(err) }
    if(exists) {
      if(is_admin){
        res.render('pages/add-product', {token : token, admin: true});
      } else {
        res.redirect(`/?session=${token}`);
      }
      if(!exists){
        res.send("invalid session token ):");
      }
    }
  });

});

router.post('/', function (req, res) {

  const { token, productName, productPrice, productQty, productDescription, productPicture} = req.body; // Extracting username and password from the form submission

  if(token == null || token == undefined || token == ""){
    res.send("invalid session token ):");
  } else {
    isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {

      if(err){ next(err) }
      if(exists) {
        if(is_admin){
          
          if(productName == "" ||productPrice == "" || productPicture == "" || productQty == "" || productDescription == ""){
            res.redirect(`/add-product/?session=${token}`)
          } else {
            queries.addProduct(productName, productPicture, productPrice, productQty, productDescription, (err) => {
              if(err){next(err);}
            });
            res.redirect(`/?session=${token}`);
          }
        } else {
          res.send("invalid session token. you are not an admin ):");
        }
      } else {
        res.send("invalid session token ):"); 
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