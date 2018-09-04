var fs = require('fs');
var doc = fs.readFileSync(`${__dirname}/empresa_edit.txt`, 'utf8');
var itens = doc.split("##")
let empresas = [];

require('../../config/database')
const ParceiroModel = require('../parceiros/parceiro')

const save = async (parceiro) => {
    let novoparceiro = new ParceiroModel()

    novoparceiro.nome = parceiro.nome
    novoparceiro.tipo = 'EMPRESA'
    novoparceiro.email = parceiro.email
    novoparceiro.telefone = parceiro.telefone
    novoparceiro.cpfCnpj = parceiro.cpfCnpj
    novoparceiro.descricao = ''
    novoparceiro.mediaValorHora = 0.0
    novoparceiro.enderecoId = ''
    novoparceiro.documentacao = true

    let parceiroSalvo = await novoparceiro.save()

    console.log(parceiroSalvo)
}


itens.array.forEach(element => {
    
});
itens.forEach(element => {

    if (element.length > 5) {

        let separarQuebraDeLinha = element.split("\n")

        let empresa = {
            "nome": getItem(separarQuebraDeLinha[0]),
            "cpnj": getItem(separarQuebraDeLinha[1]),
            "cep": getItem(separarQuebraDeLinha[2]),
            "telefone": getItem(separarQuebraDeLinha[3]),
            "email": getItem(separarQuebraDeLinha[4]),
            "rua": "",
            "bairro": "",
            "cidade": ""
        }

        save(empresa)

        empresas.push(empresa)
    }
});

function getItem(itemToSplit) {
    if (itemToSplit) {
        let value = itemToSplit.split("#")[1];
        if (value)
            return value.trim()
    }
    return ""
}

console.log(`Foram encontradas ${empresas.length} empresas`)
