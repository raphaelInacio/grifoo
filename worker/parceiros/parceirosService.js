const fs = require('fs')
const EmailSender = require('../utils/emailSender')
const dateFormat = require('dateformat')
const restUtil = require('../utils/restUtil')

const Parceiroservice = {

  enviarConfirmacaoParceiro: async (novoCadastro) => {

    console.log(`Enviando email de evento: ${JSON.stringify(novoCadastro)}`)

    fs.readFile(__dirname + "/template-parceiro.html", async function (err, html) {
      if (err) throw err;

      html = html.toString()
      if (novoCadastro !== null) {
        html = html.replace(/%nome%/g, novoCadastro.nome);
      }

      EmailSender.send(
        "Atendimento Grifoo <contato@grifoo.com>", ["contato.raphaelinacio@gmail.com",
          novoCadastro.email
        ],
        "[Confirmação de Cadastro]",
        html.toString())
    });

  }
}

module.exports = Parceiroservice