
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
        res.render('pages/add-product', {token : token});
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