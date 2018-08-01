const redis = require("redis");
const enviroments = require('../config/enviroments')
const confirmacaoCadastroParceiroSub = redis.createClient(enviroments.queued);
const orcamentoParceirosSub = redis.createClient(enviroments.queued);
const ParceirosService = require('../parceiros/parceirosService')

confirmacaoCadastroParceiroSub.on("message", function (channel, message) {
    let cadastroParceiro = JSON.parse(message)
    ParceirosService.enviarConfirmacaoParceiro(cadastroParceiro)
});

orcamentoParceirosSub.on("message", function (channel, message) {
    let novoPedido = JSON.parse(message)
    ParceirosService.enviarEmailOrcamentoEmpresa(novoPedido)
});

confirmacaoCadastroParceiroSub.subscribe(enviroments.parceiroQueueName);
orcamentoParceirosSub.subscribe(enviroments.orcamentoQueue);

console.log(`Conectado as filas ${enviroments.parceiroQueueName}, ${enviroments.orcamentoQueue}`)
