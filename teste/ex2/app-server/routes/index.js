var express = require('express');
var router = express.Router();
var fs = require('fs')
var axios = require('axios')

var token = fs.readFileSync("token.txt")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      res.render('classes',{classes:dados.data})
    })
    .catch(erro => {
      res.render('error', {error:erro})
    })

});

router.get('/classes/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.id + '?token=' + token)
    .then(dados => {
      res.render('classe',{classe:dados.data})
    })
    .catch(erro => {
      res.render('error', {error:erro})
    })

});


router.get('/termosIndice', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(dados => {
      res.render('termos-indice',{termos:dados.data})
    })
    .catch(erro => {
      res.render('error', {error:erro})
    })

});



module.exports = router;
