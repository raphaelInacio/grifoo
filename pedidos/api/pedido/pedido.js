
const restFul = require('node-restful')
const mongoose = restFul.mongoose

const orcamento = new mongoose.Schema({
    mensagem: {
        type: String,
        require: true
    },
    valor: {
        type: String,
        require: true
    },
    parceiroId: {
        type: String,
        require: true
    },
    selecionado : {
        type: Boolean
    }
});

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
    }, status: {
        type: String,
        enum: ['QUEUED', 'ERROR', 'EMAIL-ENVIADO', 'ABERTO', 'FECHADO', 'CANCELADO']
    }, tipoPedido: {
        type: String,
        enum: ['EMPRESA', 'EVENTO']
    }, orcamentos: [orcamento]
})






module.exports = mongoose.model('Pedido', pedido)