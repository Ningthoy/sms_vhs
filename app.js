var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useFindAndModify: false });
require('./config/passport')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var app = express();
require('dotenv').config();
// view engine setup
app.engine('hbs', expressHbs({ defaultLayout: 'commonlayout', extname: '.hbs', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(validator())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/'),
    express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'),
    express.static(__dirname + '/public/admin/'),
]);
app.use(session({
    secret: 'mynameisbinayakdas',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 100 * 60 * 1000 }
}));;
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    //res.cookie('X-SRF-TOKEN', req.csrfToken());
    //res.locals.csrftoken = req.csrfToken();
    res.locals.session = req.session;
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user || null;
    next();
});
app.use('/', indexRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //next(createError(404));
    res.render('user/maintainance', { title: 'SMS: Maintainance Page' });
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

mongoose.Promise = Promise;

module.exports = app;