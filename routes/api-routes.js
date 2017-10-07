// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
// var bcrypt = require('bcrypt');
const saltRounds = 10;

// Routes
// =============================================================
module.exports = function(app) {


  // get all products
  app.get("/api/products/all", function(req, res) {
    db.Product.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // get by category
  app.get("/api/category/:category", function(req, res) {
    db.Product.findAll({
        where: {
         category: req.params.category
        }
    }).then(function(results) {
      res.json(results);
    });
  });


  app.post("/addProducts", function(req, res) {
    // console.log(req.body.category)
    // console.log(req.body.price);
    // console.log(req.body.productName);
    // console.log(req.body.description);
    db.Product.create({
      UserId: 2,
      productName: req.body.productName,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      // imageURL: req.body.imageURL
      UserId: 1
    }).then(function(result) {
      res.json(result);
    });
  });
  
  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
      // res.render("userProducts", { userProducts: data });
    });
  });

  app.get("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        $and: [
          {userName: req.params.userName },
          {password: req.params.password }
        ]
      }
    }).then(function(results) {
      res.json(results);
    }).catch(function (err) {
      res.json("");
    }); 
  });

};
