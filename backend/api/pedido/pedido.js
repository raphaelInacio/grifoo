
const restFul = require('node-restful')
const mongoose = restFul.mongoose

const pedido = new mongoose.Schema({
    dataPedido: {
        type: Date,
        default: Date.now
    },
    enderecoId: { 
        type: String,
        require: true
    },
    clienteId: { 
        type: String,
        require: true
    },
    eventoId: { 
        type: String,
        require: true
    },status: {
        type: String,
        enum: ['QUEUED', 'ERROR', 'EMAIL-ENVIADO','ABERTO','FECHADO','CANCELADO']
    }
})

module.exports = mongoose.model('Pedido', pedido)