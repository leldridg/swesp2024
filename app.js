const express = require("express");
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

app.get("/", function (req, res) {
	// res.render(`pages/home`);
	res.render('pages/home', { title: 'Home Page', message: 'Welcome to my INDEX Express app!' });

});


app.listen(port, function () {
	console.log(`Example EJS Intro app listening on port ${port}!`);
});

