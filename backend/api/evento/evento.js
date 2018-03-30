
const restFul = require('node-restful')
const mongoose = restFul.mongoose

const evento = new mongoose.Schema({
    tipoEvento: {
        type: String,
        require: true
    },
    numeroPessoas: {
        type: Number,
        require: true
    },
    outrasInformacoes: {
        type: String,
        require: true
    },
    dataHoraDeTermino: {
        type: String,
        require: true,
    },
    dataHoraDeInicio: {
        type: String,
        require: true,
    }

})

module.exports = mongoose.model('Evento', evento)
