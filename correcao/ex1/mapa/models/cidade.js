const mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    nome: String,
    população: Number,
    descrição: String,
    distrito: String,
    _id: String
})

module.exports = mongoose.model('cidade', cidadeSchema) 
