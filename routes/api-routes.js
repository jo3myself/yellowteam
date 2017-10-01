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

  // GET route for getting all
  app.get("/", function(req, res) {
    
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
  
};
