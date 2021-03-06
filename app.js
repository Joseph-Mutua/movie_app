var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
const helmet = require("helmet");

var indexRouter = require("./routes/index");

//============PASSPORT CONFIG==================//
const session = require("express-session");

app.use(
  session({
    secret: "Mutua is just awesome",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const GitHubStrategy = require("passport-github").Strategy;

const passportConfig = require("./passportConfig");
passport.use(
  new GitHubStrategy(
    passportConfig,
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
