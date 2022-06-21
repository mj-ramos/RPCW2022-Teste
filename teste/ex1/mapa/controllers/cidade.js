var Cidade = require('../models/cidade')

module.exports.lista_cidades = function () {
    return Cidade
        .find({},{nome:1,distrito:1})
        .exec()
}

module.exports.info_cidade = function (id_cidade) {
    return Cidade
        .find({_id:id_cidade})
        .exec()
}

module.exports.lista_nomes_cidades = function (id_cidade) {
    return Cidade
        .find({},{_id:0,nome:1})
        .sort( { nome: -1 } )
        .exec()
}

module.exports.lista_cidades_distrito = function (distrito) {
    return Cidade
        .find({distrito:distrito},{nome:1})
        .exec()
}

