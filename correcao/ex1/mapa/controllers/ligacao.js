var Ligacao = require('../models/ligacao')
var Cidade = require('../models/cidade')

module.exports.ligacoes_origem = async function (nome_cidade) {
    var id_cidade = await Cidade.findOne( { nome : nome_cidade } , { _id : 1 });
    id_cidade = id_cidade['_id'];

    return Ligacao.aggregate([{
        $match: {
            origem : id_cidade
        }
    },{
        $lookup: {
            from: 'cidades',
            localField: 'destino',
            foreignField: '_id',
            as: 'destino'
        }
    }, {
        $project: {
            nome_destino : {$first: '$destino.nome'},
            id_destino : {$first: '$destino._id'}
        }
    }])
    .exec();
}

module.exports.ligacoes_dist = function (dist) {
    dist = parseFloat(dist)

    return Ligacao.aggregate([{
        $match: {
            distância : { $gte: dist }
        }
    },{
        $lookup: {
            from: 'cidades',
            localField: 'origem',
            foreignField: '_id',
            as: 'origem'
        }
    },{
        $lookup: {
            from: 'cidades',
            localField: 'destino',
            foreignField: '_id',
            as: 'destino'
        }
    }, {
        $project: {
            nome_origem : {$first: '$origem.nome'},
            id_origem: {$first: '$origem._id'},
            nome_destino : {$first: '$destino.nome'},
            id_destino : {$first: '$destino._id'}
        }
    }])
    .exec();
}


