const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },tipoPedido: {
        type: String,
        enum: ['EMPRESA', 'EVENTO']
    },mensagem: {
        type: String
    }
})

module.exports = mongoose.model('Pedido', pedido)