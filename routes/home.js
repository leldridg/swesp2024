
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {

  const token = req.query.session || null;

  queries.fetchProducts((err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    console.log(token);
    if(token == null){
      res.render('pages/home', { title: "Home!", items: items, token: null, admin:false});

    }
    else {

    
    queries.uidFromSID(token, (err, exists, user_id) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }

      if(!exists){
        res.send("invalid session token ):");
      }
      if(exists){
        queries.adminFromUID(user_id, (err, exists, is_admin) => {
          if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
          }
          if(!exists){
            res.send("invalid session token ):");
          }
          if(exists){


            res.render('pages/home', { title: "Home!", items: items, token: token, admin:is_admin});
          }
        });
      }
    });
  }
  });
  
});


module.exports = router;
