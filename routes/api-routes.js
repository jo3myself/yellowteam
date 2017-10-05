// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/products", function(req, res) {
    var query = {};
    if (req.query.category_search) {
      query.Category = req.query.category_search;
    }
    app.Product.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.post("/addProducts", function(req, res) {
    console.log(req.body.category)
    console.log(req.body.price);
    console.log(req.body.productName);
    console.log(req.body.description);
    db.Product.create({
      productName: req.body.productName,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      imageURL: req.body.imageURL
    }).then(function(result) {
  
      res.json(result);
    });
  });
  
    // Add a New user
  app.post("/user", function(req, res) {
    // console.log("User Data:");
    // console.log(req.body);
    const password = req.body.password;

    // Hash the password then save to DB
    bcrypt.hash(password, saltRounds).then(function(hash) {
      db.User.create({
        name: req.body.first_name,
        email: req.body.email,
        phone: req.body.phone_number,
        userName: req.body.user_name,
        password: hash,
        profileImage: req.body.profile_image,
        location: req.body.location
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  });

  // PUT route for Updating User.
  app.put("/user", function(req, res) {
    const password = req.body.password;

    // Hash the password then save to DB
    bcrypt.hash(password, saltRounds).then(function(hash) {
      db.User.update({
        name: req.body.first_name,
        email: req.body.email,
        phone: req.body.phone_number,
        userName: req.body.user_name,
        password: hash,
        profileImage: req.body.profile_image,
        location: req.body.location
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
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
