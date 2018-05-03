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
    novoPedido.status = 'ABERTO'
    novoPedido.enderecoId = pedido.enderecoId

    let dadosDoCliente = await ClienteDao.findById(novoPedido.clienteId);
    let enderecoDoEvento = await EnderecoDao.findById(novoPedido.enderecoId)
    let dadosDoEvento = await EventoDao.findById(novoPedido.eventoId)
    let pedidoSalvo = await novoPedido.save();

    queueService.sendToQueue(pedidoSalvo)
    
    sendEmail(dadosDoCliente, enderecoDoEvento, dadosDoEvento)

    return pedidoSalvo;
  }
  
}

const sendEmail = (dadosDoCliente, enderecoDoEvento, dadosDoEvento) => {
  try {
    
  
  console.log(`Inicio do envio de email para ${dadosDoCliente.nome} dono do email ${dadosDoCliente.email}`)
  
  console.log(`########## ${args.SENDGRID_API_KEY}`)

  const mailer = Sendgrid(args.SENDGRID_API_KEY);

  const email = new helper.Mail();

  email.setTemplateId("31d06dcb-cd2d-4dae-b057-17bfcd028e6f");

  email.setFrom(new helper.Email('contato@grifoo.com'));

  email.setSubject('Grifoo!');

  email.addContent(new helper.Content('text/html', 'Template'));

  const personalization = new helper.Personalization();

  personalization.addTo(new helper.Email(dadosDoCliente.email));

  personalization.addSubstitution(new helper.Substitution('%nome%', dadosDoCliente.nome));
  personalization.addSubstitution(new helper.Substitution('%email%', dadosDoCliente.email));
  personalization.addSubstitution(new helper.Substitution('%telefone%', dadosDoCliente.telefone));
  personalization.addSubstitution(new helper.Substitution('%endereco%', `${enderecoDoEvento.rua}, ${enderecoDoEvento.numero} - ${enderecoDoEvento.complemento}, ${enderecoDoEvento.bairro}, ${enderecoDoEvento.cidade} - ${enderecoDoEvento.estado}`));
  personalization.addSubstitution(new helper.Substitution('%evento%', dadosDoEvento.tipoEvento));
  personalization.addSubstitution(new helper.Substitution('%numero-pessoas%', dadosDoEvento.numeroPessoas));
  personalization.addSubstitution(new helper.Substitution('%periodo%', `De ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeInicio, 'isoTime')} até ${dateFormat(dadosDoEvento.dataHoraDeTermino, 'shortDate')} as ${dateFormat(dadosDoEvento.dataHoraDeTermino, 'isoTime')}`));

  email.addPersonalization(personalization);

  const request = mailer.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: email.toJSON(),
  });

  mailer.API(request, (e, response) => {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

  console.log(`Email enviado com sucesso para ${dadosDoCliente.nome} dono do email ${dadosDoCliente.email}`)

} catch (error) {
  console.log(`Erro ao enviar email ${error}`)
}

}

module.exports = PedidoService