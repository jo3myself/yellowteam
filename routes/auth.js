var authController = require('../controllers/controllers.js');

module.exports = function(app, passport) {
   app.get('/sign-up', authController.signup);
   app.get('/sign-in', authController.signin);
   app.get('/logout', authController.logout)
   

   app.post('/sign-up', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
    }));

    // app.post('/sign-in', (req, res, next) => {
    //     console.log('attempting signin post middle')
    //     next()
    // })
    app.post('/sign-in', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/sign-in'
    }));

    // app.get('/user', isLoggedIn, authController.user);
    
    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {
        console.log('redirect',req.isAuthenticated())
        if (req.isAuthenticated())
        
            return next();
            
        res.redirect('/sign-in');
        
    }
}
