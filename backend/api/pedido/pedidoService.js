const Pedido = require('./pedido')
const emailService = require('../email/emailService')

const PedidoService = {
  findAll: (res) => {
    Pedido.find(function (err, pedidos) {
      if (err)
        res.send(err);
      res.json(pedidos);
    });

  },
  findById: (id, res) => {
    Pedido.findById(id, function (error, pedido) {
      if (error)
        res.send(error);
      res.json(pedido);
    });

  },
  save: (pedido, res) => {

    let novoPedido = new Pedido()

    novoPedido.clienteId = pedido.clienteId,
    novoPedido.eventoId = pedido.eventoId,
    novoPedido.status = 'ABERTO'
    novoPedido.enderecoId = pedido.enderecoId,

      novoPedido.save(function (err, pedido) {
        if (err)
          res.send(err);

          const msg = {
            to: 'contato.raphaelinacio@gmail.com',
            from: 'test@example.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };

      emailService.send(msg, res.json(pedido))
      });





  }
}

module.exports = PedidoService