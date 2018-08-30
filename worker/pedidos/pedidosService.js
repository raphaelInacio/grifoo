const fs = require('fs')
const EmailSender = require('../utils/emailSender')
const dateFormat = require('dateformat')
const pedidosServiceIntegrations = require('./pedidoServiceIntegration')

const Pedidoservice = {

  enviarEmailConfirmacaoPedido: async (novoPedido) => {

    console.log(`Enviando email de evento: ${JSON.stringify(novoPedido)}`)

    let dadosDoCliente = await pedidosServiceIntegrations.get(`/clientes/${novoPedido.clienteId}`)
    let enderecoDoEvento = await pedidosServiceIntegrations.get(`/enderecos/${novoPedido.enderecoId}`)
    let dadosDoEvento = await pedidosServiceIntegrations.get(`/eventos/${novoPedido.eventoId}`)

    fs.readFile(__dirname + "/template-evento.html", async function (err, html) {
      if (err) throw err;

      html = html.toString()
      if (dadosDoCliente !== null) {
        html = html.replace(/%nome%/g, dadosDoCliente.nome);
        html = html.replace(/%email%/g, dadosDoCliente.email);
        html = html.replace(/%telefone%/g, dadosDoCliente.telefone);
        html = html.replace(/%cliente-id%/g, novoPedido.clienteId);
      }

      if (enderecoDoEvento !== null) {
        html = html.replace(/%endereco%/g, `${enderecoDoEvento.rua}, ${enderecoDoEvento.numero} - ${enderecoDoEvento.complemento}, ${enderecoDoEvento.bairro}, ${enderecoDoEvento.cidade} - ${enderecoDoEvento.estado}`);
      }

      if (dadosDoEvento !== null) {
        html = html.replace(/%evento%/g, dadosDoEvento.tipoEvento);
        html = html.replace(/%numero-pessoas%/g, dadosDoEvento.numeroPessoas);
        html = html.replace(/%periodo%/g, `Total de horas: ${dadosDoEvento.duracaoEvento} com início em ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'isoTime')}`);
      }

      EmailSender.send(
        "Atendimento Grifoo <atendimento@grifoo.com>",
        [dadosDoCliente.email],
        "[Confirmação de Pedido]",
        html.toString())
    });

    novoPedido.status = 'EMAIL-ENVIADO'
  }
}

module.exports = Pedidoservice