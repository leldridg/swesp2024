const express = require("express");

const home = require("./routes/home.js");
const login = require("./routes/login.js");
// const db = require('./db.js')

const app = express();
// const cors = require('cors');
// app.use(cors);




const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = 3000;

const path = require('path');

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

// can do this instead of the above line
// console.log(app.use(express.static(path.join(__dirname, 'public'))))


app.use("/", home);
app.use("/login", login);

// app.get("/", function (req, res) {

// 	let sql = `SELECT *`;

// 	console.log()
	
// 	db.query(sql, (err, result) => {
// 		if(err) throw err;
//         res.render(`pages/home.js`, {title: 'Home Page worked!', message: result});
// 	});

// });

// app.get()



app.listen(port, function () {
	console.log(`SWE SP 2024 app listening on port  ${port}!`);
});

