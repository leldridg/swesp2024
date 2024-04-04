
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
          console.log("admin " + is_admin);
          if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
          }
          if(!exists){
            res.send("invalid session token ):");
          }
          if(exists){
            console.log("abc" + is_admin);

            if(is_admin == null || is_admin == undefined){
              return res.status(500).send('An error, your status is undefined');
            } else {
              res.render('pages/home', { title: "Home!", items: items, token: token, admin:is_admin});
            }
          }
        });
      }
    });
  }
  });
  
});


module.exports = router;
