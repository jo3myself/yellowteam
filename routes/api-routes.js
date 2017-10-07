// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var bcrypt = require('bcrypt');
const saltRounds = 10;
var formidable = require('formidable');
var path = require('path');  

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

  // Add a New Products
  app.post("/addProducts", function(req, res) {
    // Setup formidable
    var form = new formidable.IncomingForm();

    // Parse the form request
    form.parse(req, function(err, fields, files) {
      // Add Product to DB    
      db.Product.create({
        UserId: fields.userID,
        productName: fields.productName,
        category: fields.category,
        price: fields.price,
        description: fields.description,
        imageURL: files.imageURL.name
      }).then(function(dbProduct) {
        dbProduct.added = true;      
        res.render('addProducts', dbProduct );
      });
    });

    form.on('fileBegin', function (name, file){
      file.path = path.basename(path.dirname('../')) + '/uploads/products/' + file.name;     
    });

    form.on('end', function() {
      console.log('Thanks File Uploaded')
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
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone_number,
        userName: req.body.user_name,
        password: hash,
        // profileImage: req.body.profile_image,
        location: req.body.location
      }).then(function(dbUser) {
        res.render('store', {userInfo: dbUser});
      });
    });
  });

  // PUT route for Updating User.
  app.put("/user", function(req, res) {
    // Setup formidable
    var form = new formidable.IncomingForm();

    // Parse the form request
    form.parse(req, function(err, fields, files) {
      const password = fields.password;

      // Hash the password then save to DB
      bcrypt.hash(password, saltRounds).then(function(hash) {
        db.User.update({
          name: fields.first_name,
          email: fields.email,
          phone: fields.phone_number,
          userName: fields.user_name,
          password: hash,
          profileImage: files.profile_image.name,
          location: fields.location
        }, {
          where: {
            id: fields.id
          }
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });

    });

    form.on('fileBegin', function (name, file){
      file.path = path.basename(path.dirname('../')) + '/uploads/products/' + file.name;     
    });

    form.on('end', function() {
      console.log('Thanks File Uploaded')
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
