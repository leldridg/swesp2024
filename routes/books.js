// books.js - My route module for book logic

const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;


// Home page route
router.get("/", function (req, res) {
  res.send("API home page");
});

// New book page route
router.get("/enter_book_info", function (req, res) {
  res.render(`pages/enter_book_info`);
});

// Add book logic
router.post("/add_book", function (req, res) {
	
	let sql = `INSERT INTO books 
            (
                title, author
            )
            VALUES
            (
                ?, ?
            )`;
	//console.log(req.body);
	//res.render(`pages/home`);
    db.query(sql,[req.body.title, req.body.author], (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.redirect(`../db`);
    });
});

module.exports = router;
