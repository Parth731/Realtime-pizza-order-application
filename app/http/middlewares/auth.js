
function auth(req, res, next) {

    // user is login then render next process
    // user is not login then render login page
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

module.exports = auth;