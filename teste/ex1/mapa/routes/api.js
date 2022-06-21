var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao');
const cidade = require('../models/cidade');
const ligacao = require('../models/ligacao');

//GET /api/distritos - Devolve uma lista de distritos em que para cada distrito apresenta os campos: nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).
router.get('/distritos', function(req, res, next) {
  Cidade.lista_cidades()
  .then(dados => {
    var distritos = {}
    dados.forEach(cidade => {
      if (!(cidade.distrito in distritos)) {
        console.log(distritos)
      } else {
        distritos[cidade.distrito].append({"cidade":cidade.nome,"id_cidade":cidade._id})
      }
    })  
    console.log(distritos)
    res.status(200).jsonp(distritos)
  })
  .catch(erro => res.status(500).jsonp(erro))
});

//GET /api/cidades - Devolve a lista das cidades, com os campos: id, nome, e distrito;
// GET /api/cidades?distrito=DDDD - Devolve a lista de cidades pertencentes ao distrito DDDD, para cada cidade apresenta os campos: id e nome;
router.get('/cidades', function(req, res, next) {
  if (!req.query.distrito) {
    Cidade.lista_cidades()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  } else {
    Cidade.lista_cidades_distrito(req.query.distrito)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
});

//GET /api/cidades/nomes - Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;
router.get('/cidades/nomes', function(req, res, next) {
  Cidade.lista_nomes_cidades()
  .then(dados => res.status(200).jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

//GET /api/cidades/:id - Devolve a informação completa de uma cidade;
router.get('/cidades/:id', function(req, res, next) {
  Cidade.info_cidade(req.params.id)
  .then(dados => res.status(200).jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});


//----------------------------------------------------------------------

// GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
// GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY, a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino e nome da cidade destino.
router.get('/ligacoes', function(req, res, next) {
  if (req.query.origem) {
    Ligacao.ligacoes_origem(req.query.origem)
    .then(ligacoes => {
      for (ligacao in ligacoes) {
        Cidade.info_cidade(ligacao.destino)
          .then(cidade => ligacao['nome_destino'] = cidade.nome)
          .catch(erro => res.status(500).jsonp(erro))
      }
      res.status(200).jsonp({'ligacoes':ligacoes})
    })
    .catch(erro => res.status(500).jsonp(erro)) 

  } else if (req.query.dist) {
    Ligacao.ligacoes_dist(req.query.dist)
    .then(ligacoes => {
      for (ligacao in ligacoes) {
        Cidade.info_cidade(ligacao.destino)
          .then(cidade => ligacao['nome_destino'] = cidade.nome)
          .catch(erro => res.status(500).jsonp(erro))
      }
      res.status(200).jsonp({'ligacoes':ligacoes})
    })
    .catch(erro => res.status(500).jsonp(erro)) 
  }
  
});



module.exports = router;
