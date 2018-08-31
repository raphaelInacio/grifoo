const redis = require("redis");
const enviroments = require('../config/enviroments')
const confirmacaoCadastroParceiroSub = redis.createClient(enviroments.queued);
const orcamentoParceirosSub = redis.createClient(enviroments.queued);
const ParceirosService = require('../parceiros/parceirosService')
const logger = require('../config/logs')


confirmacaoCadastroParceiroSub.on("message", function (channel, message) {
    let cadastroParceiro = JSON.parse(message)
    logger.info('Enviando confirmacao de cadastro para parceiro..')
    ParceirosService.enviarConfirmacaoParceiro(cadastroParceiro)
});

orcamentoParceirosSub.on("message", function (channel, message) {
    logger.info('Enviando orcamento para parceiros..')
    let novoPedido = JSON.parse(message)
    ParceirosService.enviarEmailOrcamentoEmpresa(novoPedido)
});

confirmacaoCadastroParceiroSub.subscribe(enviroments.parceiroQueueName);
orcamentoParceirosSub.subscribe(enviroments.orcamentoQueue);

console.log(`Conectado as filas ${enviroments.parceiroQueueName}, ${enviroments.orcamentoQueue}`)
