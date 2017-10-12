var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('sign-in', { error: req.flash("error")[0] });

}

exports.signin = function(req, res) {
    res.render('sign-in', { error: req.flash("error")[0] });

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