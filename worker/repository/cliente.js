const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Cliente', cliente)