var authController = require('../controllers/controllers.js');

module.exports = function(app, passport) {

   app.get('/sign-in', authController.signup);

   app.post('/sign-in', passport.authenticate('local-signup', {
    successRedirect: '/',

    failureRedirect: '/sign-in'
    }));

    app.get('/admin',authController.admin);

}
