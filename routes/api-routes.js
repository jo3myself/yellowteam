// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all
  app.get("/", function(req, res) {
    
  });

  // Add a New user
  app.post("/user/new", function(req, res) {
    console.log("User Data:");
    console.log(req.body);

    db.User.create({
      name: req.body.first_name,
      email: req.body.email,
      phone: req.body.phone_number,
      userName: req.body.user_name,
      password: req.body.password,
      profileImage: req.body.profile_image,
      location: req.body.location,
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
};
