// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
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


  app.get("/store/:store", function(req, res) {

    if (req.params.store) {
      db.User.findOne({
        where: {userName: req.params.store},
        include: [
            db.Product
        ]
      }).then(function(results) {
        console.log(results.Products);
        res.render('store', {userInfo: results});
        });
      }
    });

  app.get("/product-view", function(req, res) {
    res.render('product-view', {});
  });

  app.get("/store", function(req, res) {
        res.render('store', {});
  });

  
  // do the search and pass the data to search handlebars
  app.get("/search/:search", function(req, res) {
    if (req.params.search) {
      db.Product.findAll({
        where: {
          $or: [
            {productName: { like: '%' + req.params.search + '%' } },
            {category: { like: '%' + req.params.search + '%' } },
            {description: { like: '%' + req.params.search + '%' } }
          ]
        }
      }).then(function(results) {
        res.render("search", { productsSearched: results });
      });
    };
  });


  app.get('/addProducts' , function (req, res) {
    res.render('addProducts', {});
  });

};

