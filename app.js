var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var cors = require('cors')

const mongoose = require('mongoose')

// const mongooseOptions = { dbName: 'login-context'}
// mongoose.connect(process.env.MONGODB_URI, mongooseOptions)

mongoose.connect(process.env.MONGODB_URI, { dbName: 'login-context'})
  .then(() => console.log('MongoDB Connected!!!'))
  .catch((error) => console.log(error))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');

var app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

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

module.exports = app;
