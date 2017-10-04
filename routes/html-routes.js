// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads .html
  app.get("/", function(req, res) {
    res.render('index', {});
  });
  
  app.get("/user", function(req, res) {
    res.render('user', {});
  });

  app.get("/store", function(req, res) {
    res.render('store', {});
  });

  app.get("/product-view", function(req, res) {
    res.render('product-view', {});
  })

};
