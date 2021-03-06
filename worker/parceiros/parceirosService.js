const fs = require('fs')
const EmailSender = require('../utils/emailSender')
const parceiroServiceIntegration = require('./parceiroServiceIntegration')
const dateFormat = require('dateformat')
const pedidoServiceIntegration = require('../pedidos/pedidoServiceIntegration')
const logger = require('../config/logs')


const Parceiroservice = {

  enviarConfirmacaoParceiro: async (novoCadastro) => {

    logger.info(`Enviando email confirmação parceiro: ${JSON.stringify(novoCadastro)}`)

    fs.readFile(__dirname + "/template-parceiro.html", async function (err, html) {
      if (err) throw err;

      html = html.toString()
      if (novoCadastro !== null) {
        html = html.replace(/%nome%/g, novoCadastro.nome);
      }

      EmailSender.send(
        "Atendimento Grifoo <atendimento@grifoo.com>", 
        [novoCadastro.email],
        "[Confirmação de Cadastro]",
        html.toString())
    });

  }, enviarEmailOrcamentoEmpresa: async (novoPedido) => {

    logger.info(`Enviando emails de cotações para parceiros: ${JSON.stringify(novoPedido)}`)

    let dadosDoCliente = await pedidoServiceIntegration.get(`/clientes/${novoPedido.clienteId}`)
    let enderecoDoEvento = await pedidoServiceIntegration.get(`/enderecos/${novoPedido.enderecoId}`)
    let dadosDoEvento = await pedidoServiceIntegration.get(`/eventos/${novoPedido.eventoId}`)
    let parceiros = await parceiroServiceIntegration.get(`/parceiros`)

    parceiros.forEach(parceiro => {
        logger.info(`Enviando mail para parceiro, ${parceiro.nome} e email ${parceiro.email}`)

        fs.readFile(__dirname + "/template-novo-orcamento.html", async function (err, html) {
          if (err) throw err;

          html = html.toString()

          if (parceiro != null) {
            html = html.replace(/%nome-parceiro%/g, parceiro.nome);
            html = html.replace(/%parceiro-id%/g, parceiro._id);
            html = html.replace(/%pedido-id%/g, novoPedido._id);
          }

          if (dadosDoCliente !== null) {
            html = html.replace(/%nome%/g, dadosDoCliente.nome);
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
            [parceiro.email],
            "[Solicitação de orçamento]",
            html.toString())
        });

    });

  }
}

module.exports = Parceiroservice