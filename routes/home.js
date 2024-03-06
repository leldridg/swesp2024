
var express = require('express');
var router = express.Router();

const queries = require('../database/queries');


router.get('/', async function (req, res, next) {

  queries.userIDfromSession(req.query.session, (err, result) => {
    if(err) { console.log(err); }
    

    res.render('pages/home', { title: result.rows[0].user_id, items: null});

  });


});


module.exports = router;
