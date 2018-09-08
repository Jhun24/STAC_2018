var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

let passport = require('passport');
let session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized:true
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});

require('./routes/auth')(app);
require('./routes/data')(app);
require('./routes/books')(app);
require('./routes/kakak_passport')(app);
require('./routes/route')(app);

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
