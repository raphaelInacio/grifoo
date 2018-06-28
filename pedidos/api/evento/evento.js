
const restFul = require('node-restful')
const mongoose = restFul.mongoose

const evento = new mongoose.Schema({
    tipoEvento: {
        type: String,
        require: false
    },
    numeroPessoas: {
        type: String,
        require: false
    },
    outrasInformacoes: {
        type: String,
        require: false
    },
    duracaoEvento: {
        type: String,
        require: false,
    },
    dataHoraDeInicio: {
        type: String,
        require: false,
    }

})

module.exports = mongoose.model('Evento', evento)
