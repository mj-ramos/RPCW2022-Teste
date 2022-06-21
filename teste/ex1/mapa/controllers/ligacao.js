var Ligacao = require('../models/ligacao')


module.exports.ligacoes_origem = function (origem) {
    return Ligacao
        .find({origem:origem},{destino:1})
        .exec()
}

module.exports.ligacoes_dist = function (dist) {
    return Ligacao
        .find({ dist: { $gte: dist }},{destino:1})
        .exec()
}