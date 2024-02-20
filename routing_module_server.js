const express = require("express");
const api = require("./myApi.js")
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/unique", function (req, res) {
  res.send("This is a different page!");
});

app.use("/api", api);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
