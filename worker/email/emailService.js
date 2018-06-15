const fs = require('fs')
const EmailSender = require('../email/emailSender')
const dateFormat = require('dateformat')
const restUtil = require('../utils/restUtil')

const EmailService = {

  enviarEmailEvento: async (novoPedido) => {

    console.log(`Enviando email de evento: ${JSON.stringify(novoPedido)}`)

    let dadosDoCliente = await restUtil.get(`/clientes/${novoPedido.clienteId}`)
    let enderecoDoEvento = await restUtil.get(`/enderecos/${novoPedido.enderecoId}`)
    let dadosDoEvento = await restUtil.get(`/eventos/${novoPedido.eventoId}`)

    console.log(JSON.stringify(`Dados do cliente: ${dadosDoCliente}`))
    console.log(JSON.stringify(`Endereço do evento: ${enderecoDoEvento}`))
    console.log(JSON.stringify(`Dados do evento: ${dadosDoEvento}`))

    fs.readFile(__dirname + "/template-evento.html", async function (err, html) {
      if (err) throw err;

      html = html.toString()
      if (dadosDoCliente !== null) {
        html = html.replace(/%nome%/g, dadosDoCliente.nome);
        html = html.replace(/%email%/g, dadosDoCliente.email);
        html = html.replace(/%telefone%/g, dadosDoCliente.telefone);
      }

      if (enderecoDoEvento !== null) {
        html = html.replace(/%endereco%/g, `${enderecoDoEvento.rua}, ${enderecoDoEvento.numero} - ${enderecoDoEvento.complemento}, ${enderecoDoEvento.bairro}, ${enderecoDoEvento.cidade} - ${enderecoDoEvento.estado}`);
      }

      if (dadosDoEvento !== null) {
        html = html.replace(/%evento%/g, dadosDoEvento.tipoEvento);
        html = html.replace(/%numero-pessoas%/g, dadosDoEvento.numeroPessoas);
        html = html.replace(/%periodo/g, `Total de horas: ${dadosDoEvento.duracaoEvento} com início em ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'isoTime')}`);
      }

      EmailSender.send(
        "Atendimento Grifoo <contato@grifoo.com>", ["contato.raphaelinacio@gmail.com",
          dadosDoCliente.email
        ],
        "[Confirmação de Pedido]",
        html.toString())
    });

    novoPedido.status = 'EMAIL-ENVIADO'
  },
  enviarEmailEmpresa: async (novoPedido) => {

    let dadosDoCliente = await ClienteDao.findById(novoPedido.clienteId);

    fs.readFile(__dirname + "/template-empresa.html", function (err, html) {
      if (err) throw err;

      html = html.toString()

      if (dadosDoCliente !== null) {
        html = html.replace(/%nome%/g, dadosDoCliente.nome);
        html = html.replace(/%email%/g, dadosDoCliente.email);
        html = html.replace(/%telefone%/g, dadosDoCliente.telefone);
      }

      EmailSender.send(
        "Atendimento Grifoo <contato@grifoo.com>", ["contato.raphaelinacio@gmail.com", dadosDoCliente.email],
        "[Confirmação de Pedido]",
        html.toString())
    });

    pedido.clienteId = novoPedido.clienteId
    pedido.eventoId = novoPedido.eventoId
    pedido.status = novoPedido.status
    pedido.enderecoId = novoPedido.enderecoId
    pedido.tipoPedido = novoPedido.tipoPedido
    pedido.status = 'EMAIL-ENVIADO'

  }
}

module.exports = EmailService