const Pedido = require('./pedido')
const clienteService = require('../cliente/clienteService')
const emailService = require('../email/emailService')
const Sendgrid = require('sendgrid')
const helper = require('sendgrid/lib/helpers/mail/mail')
const ClienteDao = require('../cliente/cliente')
const EventoDao = require('../evento/evento')
const EnderecoDao = require('../endereco/endereco')
const dateFormat = require('dateformat')
const yargs = require('yargs')
const args = yargs.argv
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
    novoPedido.eventoId = pedido.eventoId
    novoPedido.status = pedido.status
    novoPedido.enderecoId = pedido.enderecoId
    novoPedido.tipoPedido = pedido.tipoPedido

    let dadosDoCliente = await ClienteDao.findById(novoPedido.clienteId);
    let enderecoDoEvento = await EnderecoDao.findById(novoPedido.enderecoId)
    let dadosDoEvento = await EventoDao.findById(novoPedido.eventoId)
    let pedidoSalvo = await novoPedido.save();

    queueService.sendToQueue(JSON.stringify(pedidoSalvo))

    return pedidoSalvo;
  }
}

module.exports = PedidoService