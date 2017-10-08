var exports = module.exports = {}

exports.signup = function(req, res) {
   res.render('sign-in');

}

exports.signin = function(req, res) {
    res.render('sign-in');
    // , {
    //     helpers: {
    //       loggedIn: function() {
    //         return (req.isAuthenticated()) ? 'log out' : 'log in';
    //       }
    //     }
    //   });
    
}

exports.user = function(req, res) {
    console.log(req)
    res.render('user');
}

exports.logout = function(req, res) {
       req.session.destroy(function(err) {
           res.redirect('/');
       });
}