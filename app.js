const express = require("express");

const home = require("./routes/home.js");
const login = require("./routes/login.js");

const db = require('./db.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))


app.use("/", home);
app.use("/login", login);

app.listen(port, function () {
	console.log(`SWE SP 2024 app listening on port  ${port}!`);
	// db.query('SELECT *');
});

