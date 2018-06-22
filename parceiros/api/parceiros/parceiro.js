const mongoose = require('mongoose');

const parceiro = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    tipo: {
        type: String,
        enum: ['EMPRESA', 'PROFISSIONAL'],
        require: true,
    },
    email: {
        type: String,
        require: true,
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