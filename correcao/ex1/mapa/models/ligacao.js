const mongoose = require('mongoose')

var ligacaoSchema = new mongoose.Schema({
    origem: String,
    destino: String,
    distância: Number,
    _id: String
})

module.exports = mongoose.model('ligacoe', ligacaoSchema) 
