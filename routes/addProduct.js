
var express = require('express');
var router = express.Router();

const isAdmin = require('../database/isTokenAdmin');
const queries = require('../database/queries');


router.get('/', function (req, res, next) {

  const token = req.query.session || null;

  console.log(token);

  res.render('pages/add-product', {token : token});
});


router.post('/', function (req, res) {

  console.log(req.body);

  const { token, productName, productPrice, productQty, productDescription, productPicture} = req.body; // Extracting username and password from the form submission

  if(token == null || token == undefined || token == ""){
    res.send("invalid session token ):");
  } else {
    isAdmin.isTokenAdmin(token, (err, exists, is_admin) => {

      if(err){ next(err) }
      if(exists) {
        if(is_admin){

          //function addProduct(name, img, price, quantity, desc, callback) {
          queries.addProduct(productName, productPicture, productPrice, productQty, productDescription, (err) => {
            if(err){next(err);}
          });
          res.redirect(`/?session=${token}`);
        } else {
          res.send("invalid session token. you are not an admin ):");
        }
      } else {
        res.send("invalid session token ):"); 
      }
    });
  }


});


module.exports = router;