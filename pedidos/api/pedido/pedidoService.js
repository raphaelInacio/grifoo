const Pedido = require('./pedido')
const queueService = require('../queue/queueServie')

const PedidoService = {

  findAll: async () => {
    let todosPedidos = await Pedido.find();
    return todosPedidos;
  },

  findById: async (id) => {
    let pedidoUnico = await Pedido.findById(id);
    return pedidoUnico;
  },

  save: async (pedido) => {

    let novoPedido = new Pedido()

    novoPedido.clienteId = pedido.clienteId
    novoPedido.status = pedido.status
    novoPedido.enderecoId = pedido.enderecoId
    novoPedido.tipoPedido = pedido.tipoPedido
    novoPedido.eventoId = pedido.eventoId

    let pedidoSalvo = await novoPedido.save();

    queueService.sendToQueue(JSON.stringify(pedidoSalvo))

    return pedidoSalvo;
  }
}

module.exports = PedidoService