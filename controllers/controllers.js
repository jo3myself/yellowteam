var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('sign-in');

}

exports.signin = function(req, res) {
    res.render('sign-in');

}

exports.user = function(req, res) {
    res.render('user');
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}