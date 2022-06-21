var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');

//---------------------------------Mongodb------------------------------------------
var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost/MAPA2022' 
mongoose.connect(mongoDB, {useNewURLParser: true, useUnifiedTopology: true})

var db = mongoose.connection
db.on('error', function () {
  console.log("Erro conexão ao mongo.")}
  )
  db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
  })
//----------------------------------------------------------------------------------


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.send(err);
});

module.exports = app;
