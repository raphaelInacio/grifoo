const fs = require('fs')

const ClienteDao = require('../repository/cliente')
const EventoDao = require('../repository/evento')
const EnderecoDao = require('../repository/endereco')
const PedidoDao = require('../repository/pedido')
const EmailSender = require('../email/emailSender')
const dateFormat = require('dateformat')

const EmailService = {

  enviarEmailEvento: async (novoPedido) => {

    let dadosDoCliente = await ClienteDao.findById(novoPedido.clienteId);
    let enderecoDoEvento = await EnderecoDao.findById(novoPedido.enderecoId)
    let dadosDoEvento = await EventoDao.findById(novoPedido.eventoId)

    fs.readFile(__dirname + "/template-evento.html", function (err, html) {
      if (err) throw err;

      html = html.toString()
      html = html.replace(/%nome%/g, dadosDoCliente.nome);
      html = html.replace(/%email%/g, dadosDoCliente.email);
      html = html.replace(/%telefone%/g, dadosDoCliente.telefone);
      html = html.replace(/%endereco%/g, `${enderecoDoEvento.rua}, ${enderecoDoEvento.numero} - ${enderecoDoEvento.complemento}, ${enderecoDoEvento.bairro}, ${enderecoDoEvento.cidade} - ${enderecoDoEvento.estado}`);
      html = html.replace(/%evento%/g, dadosDoEvento.tipoEvento);
      html = html.replace(/%numero-pessoas%/g, dadosDoEvento.numeroPessoas);
      html = html.replace(/%periodo/g, `De ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'isoTime')} até ${dateFormat(dadosDoEvento.dataHoraDeTermino, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeTermino, 'isoTime')}`);

      EmailSender.send(
        "Atendimento Grifoo <contato@grifoo.com>", ["contato.raphaelinacio@gmail.com",
          dadosDoCliente.email
        ],
        "[Confirmação de Pedido]",
        html.toString())
    });

    let pedido = new PedidoDao()
    pedido.clienteId = novoPedido.clienteId
    pedido.eventoId = novoPedido.eventoId
    pedido.status = novoPedido.status
    pedido.enderecoId = novoPedido.enderecoId
    pedido.tipoPedido = novoPedido.tipoPedido
    pedido.status = 'EMAIL-ENVIADO'
    pedido.save();
  },
  enviarEmailEmpresa: async (novoPedido) => {

    let dadosDoCliente = await ClienteDao.findById(novoPedido.clienteId);

    fs.readFile(__dirname + "/template-empresa.html", function (err, html) {
      if (err) throw err;

      html = html.toString()
      html = html.replace(/%nome%/g, dadosDoCliente.nome);
      html = html.replace(/%email%/g, dadosDoCliente.email);
      html = html.replace(/%telefone%/g, dadosDoCliente.telefone);

      EmailSender.send(
        "Atendimento Grifoo <contato@grifoo.com>", ["contato.raphaelinacio@gmail.com", dadosDoCliente.email],
        "[Confirmação de Pedido]",
        html.toString())
    });

    let pedido = new PedidoDao()
    pedido.clienteId = novoPedido.clienteId
    pedido.eventoId = novoPedido.eventoId
    pedido.status = novoPedido.status
    pedido.enderecoId = novoPedido.enderecoId
    pedido.tipoPedido = novoPedido.tipoPedido
    pedido.status = 'EMAIL-ENVIADO'
    pedido.save();

  }
}

module.exports = EmailService