// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var env = require('dotenv').load();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Sets up the Express app to handle method-override
app.use(methodOverride("_method"));

// Sets up the Express app to handle handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// For Passport
app.use(passport.initialize());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.session()); // persistent login sessions

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require('./config/passport/passport.js')(passport, db.User);
var authRoute = require('./routes/auth.js')(app,passport);


// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
