require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const MongoStore = require("connect-mongo");
var passport = require("passport");
const initPassport = require("./passport/init");

// var SQLiteStore = require("connect-sqlite3")(session);
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

var app = express();

app.locals.pluralize = require("pluralize");

// Allow api call from any origin on dev
app.use(cors());
app.options("*", cors());

//Enable logs in dev environment
app.use(logger("dev"));

//loading db config values
const dbConfig = require("./config/db");

// connecting with mongo db with mongoose, this will connect your server with mongo database
(async () => {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log("db connected");
  } catch (err) {
    console.log("error: " + err);
  }
})();

// safely disconnecting db when server is stopped
process.on("SIGINT", () => {
  mongoose.disconnect().then(() => {
    console.log("exit");
    process.exit();
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add session support to the application
app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: dbConfig.url }),
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);

// app.use(passport.authenticate("session"));
// Passport middleware
// app.use(passport.initialize());
//init passport
initPassport(app);

// adding all api routes to app
for (const route of routes) {
  console.info(`route ${route.path} is charged`);
  app.use(route.path, route.router);
}
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

const port = 3000;
//starts a server and listens on port [3000] for connections.
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
