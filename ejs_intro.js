const express = require("express");
const db = require("./db_connection.js").db_connection;
const api = require("./routes/books.js");
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const port = 3000;

const path = require('path');
 
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

// can do this instead of the above line
console.log(app.use(express.static(path.join(__dirname, 'public'))))

const user = {
	name: `Dr. Horn`,
	favorite_color: `green`,
	isGreatestTeacher: true
}

const book_list = [
	{ title: `1984`, author: `George Orwell` },
	{ title: `A Tree Grows in Brooklyn`, author: `Betty Smith` },
	{ title: `Slaughterhouse-Five`, author: `Kurt Vonnegut Jr.` },
	{ title: `The Handmaid's Tale`, author: `Margaret Atwood` },
	{ title: `To Kill a Mockingbird`, author: `Harper Lee` }
]

app.get("/", function (req, res) {
	res.render(`pages/home`);
});

app.get("/dynamic", function (req, res) {
	res.render(`pages/home_dynamic`, {user: user });
});

app.get("/list", function (req, res) {
	res.render(`pages/home_lists`, {books: book_list });
});

app.get("/partials", function (req, res) {
	res.render(`pages/home_partials`, {books: book_list, page_title: 'Partials Example' });
});

app.get("/db", function (req, res) {
	let sql = `SELECT * FROM books`;
 
   db.query(sql, (err, result) => {
       if(err) throw err;
      console.log(result);
        res.render(`pages/home_partials`, {books: result, page_title: 'DB Connection Example' });
    });
});

app.use("/books",api);

app.listen(port, function () {
	console.log(`Example EJS Intro app listening on port ${port}!`);
});
