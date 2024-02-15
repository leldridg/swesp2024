

const express = require('express');
const app = express();
var path = require('path');


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route for the home page
app.get('/', (req, res) => {


  res.render('index', { title: 'Home Page', message: 'Welcome to my INDEX Express app!', info:(path.join(__dirname, 'public'))});
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
