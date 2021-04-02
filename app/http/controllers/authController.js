const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      const { email, password } = req.body;

      //  validate request
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }

      // config/passport.js => err and null
      // config/passport.js => user pass
      // config/passport.js => all messages via info
      // passport.authenticate is also return function
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },

    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const {
        username,
        useremail,
        userpassword,
        confirmuserpassword,
      } = req.body;

      // console.log(username, useremail, userpassword, confirmuserpassword);

      //  validate request
      if (!username || !useremail || !userpassword || !confirmuserpassword) {
        req.flash("error", "All fields are required"); //messages.errors
        req.flash("name", username); //messages.name
        req.flash("email", useremail); //messages.useremail
        return res.redirect("/register");
      }

      //  check if email exists
      User.exists({ email: useremail }, (err, result) => {
        if (result) {
          req.flash("error", "Email already exists");
          req.flash("name", username);
          req.flash("email", useremail);
          return res.redirect("/register");
        }
      });

      //  if password not matched
      if (userpassword != confirmuserpassword) {
        req.flash("error", "Passwords do not match");
        req.flash("name", username);
        req.flash("email", useremail);
        return res.redirect("/register");
      }

      //  hashpassword setting
      const hashPassword = await bcrypt.hash(userpassword, 10);

      //  create a user
      const user = new User({
        name: username,
        email: useremail,
        password: hashPassword,
      });

      //  save data in database
      user
        .save()
        .then((user) => {
          //  login

          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/register");
        });
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authController;
