import createError from'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import initRoutes from './src/routes';
import db from "./src/models";
import initPassport from './src/passport/init';
import expressSession from 'express-session';
import passport from 'passport';

var app = express();

// view engine setup
// app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync(); //This creates the table if it doesn't exist (and does nothing if it already exists)





app.use(expressSession({secret: 'mySecretKey', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());

const flash = require('connect-flash');
app.use(flash());

initPassport(passport);
initRoutes(app,passport);

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
