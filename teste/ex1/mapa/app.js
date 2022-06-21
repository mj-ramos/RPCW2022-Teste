var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var apiRouter = require('./routes/api');

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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
