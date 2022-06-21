var Cidade = require('../models/cidade')

module.exports.lista_cidades = function () {
    return Cidade.find( { }, { nome : 1, distrito : 1 } ).exec()
}

module.exports.info_cidade = function (id) {
    return Cidade.find( { _id : 1 } ).exec()
}

module.exports.lista_nomes_cidades = function () {
    return Cidade
        .find( { }, { nome : 1, _id : 0 } )
        .sort( { nome : 1 } )
        .exec()
}

module.exports.lista_cidades_distrito = function (distrito) {
    return Cidade
        .find( { distrito : distrito}, { nome : 1 } )
        .exec()
}

module.exports.lista_distritos = function () {
    return Cidade
        .aggregate([{ 
            $group: {
                _id: '$distrito',
                cidades: {
                    $addToSet: {
                        nome: '$nome',
                        _id: '$_id'
                    }
                }
            } 
        }])
        .exec()
}

module.exports.lista_distritos = function () {
    return Cidade.aggregate([{
        $lookup: {
            f
        }
    }])
}

