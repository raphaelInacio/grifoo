const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const endereco = new mongoose.Schema({
    rua: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true,
        min: 0
    },
    complemento: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    }
})



module.exports = mongoose.model('Endereco', endereco)