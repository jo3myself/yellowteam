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
  app.get("/api/products", function(req, res) {
    var query = {};
    if (req.query.category_search) {
      query.Category = req.query.category_search;
   //  } else if (req.query.search) {
   //    query.productName = req.query.productName;
  	}
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Product.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });
  
};


// where: {
//     $or: [
//       { productName: { like: '%war%' } }
//     ]
//   },

  //   db.Product.findAll({
  //     where: { productName: 'war lord' },
  //     include: [db.User]
  //   }).then(function(dbProduct) {
  //     res.json(dbProduct);
  //   });
  // });