var exports = module.exports = {}

exports.signup = function(req, res) {

   res.render('sign-in');

}

exports.signin = function(req, res) {
    
    res.render('sign-in');
    
}

exports.admin = function(req, res) {
    res.render('admin');
}