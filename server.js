require("dotenv").config();

const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const port = process.env.PORT || 8000;
const view_path = path.join(__dirname, "./resources/views");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

// MongoDbStore(session);
const MongoDbStore = require("connect-mongo")(session);

// database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("connection failed....");
  });

// session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// express session setting and config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours,
  })
);

// passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// flash set
app.use(flash());

// Assets
app.use(express.static("public"));

// jab koi data hamare pass aata hai tab different form me hota hai jese ki json,urlencoded aor usko unable karane keliye following line use karani hai
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

/* set the template engine */
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", view_path);

require("./routes/web")(app);

app.listen(port, (e) => {
  console.log(`listning on port ${port}`);
});
