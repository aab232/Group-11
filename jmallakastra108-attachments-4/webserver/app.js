const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("./config/database");
const countryRoutes = require("./routes/countryRoutes");

// setting middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Display public images
app.use(express.static(path.resolve("./public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// search page
app.get("/search", function (req, res) {
  res.render("pages/search");
});

// global clock page
app.get("/global-clock", function (req, res) {
  res.render("pages/global-clock");
});

app.use("/api", countryRoutes);

// setting error path
app.use((req, res, next) => {
  const err = new Error(`${req.url} not found in this server`);
  err.status = 404;
  next(err);
});
// setting another error program
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
// export app
module.exports = app;
