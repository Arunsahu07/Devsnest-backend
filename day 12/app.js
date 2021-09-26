var createError = require('http-errors');
const createUser = require("./middlewares/creteUser");
const get = require("./middlewares/get");
const set  = require("./middlewares/set");
const emailCheck = require("./middlewares/checkEmail");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {redisStore, redisClient, session} = require("./database/redis");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({ store: new redisStore({client: redisClient}),
 secret: "123456789",
 resave: false,
 saveUninitialized: false,
 cookie: {
   httpOnly: false,
   secure: false,
   maxAge : 36000
 }

}  ))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use("/set", set);
app.use("/get/:email", get );
app.get('/create/:fullName/:email/:password',emailCheck,  createUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(5000);
module.exports = app;
