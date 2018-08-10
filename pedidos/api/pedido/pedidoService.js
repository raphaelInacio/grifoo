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

    queueService.confirmacaoEmail(JSON.stringify(pedidoSalvo))
    queueService.orcamentos(JSON.stringify(pedidoSalvo))

    return pedidoSalvo;

  },

  incluirOrcamento: async (pedidoId, orcamento) => {

    let pedido = await Pedido.findById(pedidoId);

    if (pedido.orcamentos) {
      pedido.orcamentos.push(orcamento)
    } else {
      pedido.orcamentos = [orcamento]
    }

    let pedidoSalvo = await pedido.save();

    // queueService.confirmacaoEmail(JSON.stringify(pedidoSalvo))
    // queueService.orcamentos(JSON.stringify(pedidoSalvo))

    return pedidoSalvo;

  }
}

module.exports = PedidoService