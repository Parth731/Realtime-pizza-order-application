const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        // login logic

        // check email address exist or not
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, {
            message: "No user with this email",
          });
        }

        

        //   here check user password and database password match
        bcrypt
          .compare(password, user.password)
          //   login successfull
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in successfully" });
            }
            return done(null, false, {
              message: "Wrong username and password",
            });
          })
          //   login mot successfull
          .catch((err) => {
            return done(null, false, { message: "Something went wrong" });
          });
      }
    )
  );

  // user id store in session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //user data receive from database
  passport.deserializeUser((SessionReceiveId, done) => {
    User.findById(SessionReceiveId, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
