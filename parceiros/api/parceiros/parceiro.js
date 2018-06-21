const mongoose = require('mongoose');

const parceiro = new mongoose.Schema({
    nome: {
        type: String,
        enum: ['EMPRESA', 'PROFISSIONAL']
    },
    email: {
        type: Number,
        require: true,
        min: 0
    },
    telefone: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    mediaValorHora: {
        type: String,
        require: true
    },
    enderecoId: {
        type: String,
        require: true
    },
    cpfCnpj: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Parceiro', parceiro)