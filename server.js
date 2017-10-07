// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: "jo3UCI@gmail.com",
      pass: "UCIbootcamp!"
  }
});
app.get('/send',function(req,res){
  var mailOptions={
      to : req.query.to,
      subject : req.query.subject,
      text : req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Email sent");
      res.end("sent");
       }
});
});



// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Sets up the Express app to handle method-override
app.use(methodOverride("_method"));

// Sets up the Express app to handle handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
