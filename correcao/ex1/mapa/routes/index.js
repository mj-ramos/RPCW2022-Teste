var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao');

//GET /api/cidades - Devolve a lista das cidades, com os campos: id, nome, e distrito;
//GET /api/cidades/:id - Devolve a informação completa de uma cidade;
//GET /api/cidades/nomes - Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;
//GET /api/cidades?distrito=DDDD - Devolve a lista de cidades pertencentes ao distrito DDDD, para cada cidade apresenta os campos: id e nome;
//GET /api/distritos - Devolve uma lista de distritos em que para cada distrito apresenta os campos: nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).
//GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
//GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY, a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino e nome da cidade destino.


router.get('/api/cidades', function(req, res) {
  if (req.query.distrito) {
    Cidade.lista_cidades_distrito(req.query.distrito)
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(erro => {
        res.status(500).jsonp(erro)
      });
  } else {
    Cidade.lista_cidades()
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(erro => {
        res.status(500).jsonp(erro)
      });
  }
});

router.get('/api/cidades/:id', function(req, res) {
  Cidade.info_cidade(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      res.status(500).jsonp(erro)
    });
});

router.get('/api/cidades/nomes', function(req, res) {
  Cidade.lista_nomes_cidades()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      res.status(500).jsonp(erro)
    });
});

router.get('/api/distritos', function(req, res) {
  Cidade.lista_distritos()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      res.status(500).jsonp(erro)
    });
});

router.get('/api/ligacoes', function(req, res) {
  if (req.query.origem) {
    Ligacao.ligacoes_origem(req.query.origem)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      console.log(erro)
      res.status(500).jsonp(erro)
    });

  } else if (req.query.dist) {
    Ligacao.ligacoes_dist(req.query.dist)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      console.log(erro)
      res.status(500).jsonp(erro)
    });
  }
});

module.exports = router;
