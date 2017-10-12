// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var bCrypt = require('bcrypt-nodejs');
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
                res.redirect('/product/' + dbProduct.id);
            });
        });

        form.on('fileBegin', function(name, file) {
            file.path = path.basename(path.dirname('../')) + '/public/uploads/products/' + file.name;
        });

        form.on('end', function() {
            console.log('Thanks File Uploaded');
        });
    });

    // PUT route for Updating User.
    app.put("/user", function(req, res) {

        var password = req.body.password;

        db.User.findOne({
            where: {
                id: req.body.id
            }
        }).then(function(dbUser) {
            // Checks if password input matches hash in DB
            if (password !== dbUser.password) {
                // Hash the password then save to DB
                password = bCrypt.hashSync(password);
            }

            db.User.update({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone_number,
                userName: req.body.user_name,
                password: password,
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

    // PUT route for updating products
    app.put('/editProducts/:id', function(req, res) {
        if (req.isAuthenticated()) {
            // Setup formidable
            var form = new formidable.IncomingForm();

            // Parse the form request
            form.parse(req, function(err, fields, files) {
                db.Product.update({
                    productName: fields.edited_product_name,
                    price: fields.edited_price,
                    category: fields.edited_category,
                    description: fields.edited_description,
                    imageURL: files.edited_imageURL.name
                }, {
                    where: {
                        Id: req.params.id
                    }
                }).then(function(results) {
                    console.log(req.params.id);
                    res.redirect('/editProducts/' + req.params.id)
                });
            });

            form.on('fileBegin', function(name, file) {
                file.path = path.basename(path.dirname('../')) + '/public/uploads/products/' + file.name;
            });

            form.on('end', function() {
                console.log('Thanks File Uploaded');
            });

        }
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

    app.delete("/products/:id", function(req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            },
        }).then(function(results) {
            db.User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function(user) {
                console.log("RESULTSSSSS\n\n\n", user)
                res.redirect("/store/" + user.name);
            })
        })
    })

    app.get("/api/login", function(req, res) {
        db.User.findOne({
            where: {
                $and: [
                    { userName: req.params.userName },
                    { password: req.params.password }
                ]
            }
        }).then(function(results) {
            res.json(results);
        }).catch(function(err) {
            res.json("");
        });
    });

    // Add a profile image
    app.put("/profile-image", function(req, res) {
        // Setup formidable
        var form = new formidable.IncomingForm();

        // Parse the form request
        form.parse(req, function(err, fields, files) {

            // Add profile image to DB    
            db.User.update({
                profileImage: files.profile_image.name
            }, {
                where: {
                    id: fields.id
                }
            }).then(function(dbUser) {
                res.redirect('/store/' + req.user.userName);
            });
        });

        form.on('fileBegin', function(name, file) {
            file.path = path.basename(path.dirname('../')) + '/public/uploads/users/' + file.name;
        });

        form.on('end', function() {
            console.log('Thanks File Uploaded');
        });
    });

};