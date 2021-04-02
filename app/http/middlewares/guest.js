function guest(req, res, next) {
  // when any user not login then next process contiune and loged
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
}

module.exports = guest;
