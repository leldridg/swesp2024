
var express = require('express');
var router = express.Router();
const queries = require('../database/queries');

router.get('/', function (req, res, next) {

  const token = req.query.session || null;
  const message = req.query.message || null;

    if (token == null) {
      queries.fetchVisibleProducts((err, items) => {
        res.render('pages/home', { title: "Home!", items: items, token: null, admin: false, message: "", adminItems: null});
      });
    }

    else {
      queries.uidFromSID(token, (err, exists, user_id) => {
        if (err) {
          return next(err);
        }

        if (!exists) {
          res.send("invalid session token ):");
        }
        if (exists) {
          queries.adminFromUID(user_id, (err, exists, is_admin) => {
            if (err) {
              return next(err);
            }
            if (!exists) {
              res.send("invalid session token ):");
            }
            if (exists) {
            
              if (is_admin == null || is_admin == undefined) {
                return res.status(500).send('An error, your status is undefined');
              } else {
                if (err) {
                  return next(err);
                } else {
                    queries.fetchVisibleProducts((err, items) => {
                      if(err){
                        return next(err);
                      }
                      else {
                        if(is_admin){
                          queries.fetchAdminProducts((err, adminItems) => {
                            if(err){
                              return next(err);
                            }
                            res.render('pages/home', { title: "Home!", items: items, token: token, admin: true, message: message, adminItems: adminItems});
                          });
                        } else {
                          res.render('pages/home', { title: "Home!", items: items, token: token, admin: false, message: message, adminItems: null});
                        }
                    }
                    });
                  }
                }
              }
            })
          }
        })
      };
});

// Error-handling middleware
router.use((err, req, res, next) => {
  console.error(err); // Log the error information for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server.' : err.message;
  res.status(statusCode).json({ error: message });
});

module.exports = router;
