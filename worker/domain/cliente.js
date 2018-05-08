const restFul = require('node-restful')
const mongoose = restFul.mongoose

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