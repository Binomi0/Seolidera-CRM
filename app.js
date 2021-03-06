var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var index = require('./routes/api/index');
// var users = require('./routes/users/index');

var app = express();

mongoose.connect('mongodb://db1:Jl13011977@cluster0-shard-00-00-lmtrf.mongodb.net:27017,cluster0-shard-00-01-lmtrf.mongodb.net:27017,cluster0-shard-00-02-lmtrf.mongodb.net:27017/gpcrm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', { useMongoClient: true } );
// mongoose.connect('mongodb://192.168.1.104/gpcrm', { useMongoClient: true } );
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error en la conexión'));
db.once('open', function () {
    console.log(`Conexión establecida con la base de datos ${db.host}:${db.port} \nEstado: ${db.states[db.states.connected].toUpperCase()} `)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.authorize({ session: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


