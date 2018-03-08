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
        enum: ['ABERTO', 'EMAIL-ENVIADO','FECHADO','CANCELADO']
    }
})

module.exports = restFul.model('Pedido', pedido)
module.exports = mongoose.model('Pedido', pedido)