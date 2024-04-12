const express = require("express");

const home = require("./routes/home.js");
const login = require("./routes/login.js");
const createAccount = require("./routes/createAccount.js");
const checkout = require("./routes/checkout.js");
// UNIMPLEMENTED
const addProduct = require("./routes/addProduct.js");
const editProduct = require("./routes/editProduct.js");
const viewProduct = require("./routes/viewProduct.js");
const shoppingCart = require("./routes/shoppingCart.js");

const db = require('./database/db.js'); // Adjust the path as necessary

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))


app.use("/", home);
app.use("/login", login);

app.use("/create-account", createAccount);
app.use("/checkout", checkout);
// UNIMPLEMENTED
app.use("/add-product", addProduct);
app.use("/view-product", viewProduct);
app.use("/edit-product", editProduct);
app.use("/cart", shoppingCart);

app.listen(port, function () {
  console.log(`SWE SP 2024 app listening on port ${port}!`);
});

