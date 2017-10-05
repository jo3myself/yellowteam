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

<<<<<<< HEAD
  app.get('/addProducts' , function (req, res) {
    res.render('addProducts', {});
  });

=======

  app.get("/store", function(req, res) {
    res.render('store', {});
  });

  app.get("/product-view", function(req, res) {
    res.render('product-view', {});
  })

>>>>>>> d39b6ba9189eec532d994744481d20cd46ae4ded
  
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
        },
        include: [db.User]
      }).then(function(results) {
        res.render("search", { productsSearched: results });
      });
    };
  });



<<<<<<< HEAD

=======
// search for products with this userId and pass it to handlebars
  app.get("/users/:id", function(req, res) {
    db.Product.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.User]
    }).then(function(results) {
      res.render("test", { product: results });
    });
  });

// search for product with this Id and pass it to handlebars
  app.get("/product/:id", function(req, res) {
    db.Product.findOne({
      where: {
        Id: req.params.id
      },
      include: [db.User]
    }).then(function(results) {
      res.render("testview", { product: results });
    });
  });

// search for product category and pass it to handlebars
  app.get("/category/:category", function(req, res) {
    db.Product.findAll({
      where: {
        category: req.params.category
      },
      include: [db.User]
    }).then(function(results) {
      res.render("search", { productsSearched: results });
    });
  });


};
>>>>>>> d39b6ba9189eec532d994744481d20cd46ae4ded

