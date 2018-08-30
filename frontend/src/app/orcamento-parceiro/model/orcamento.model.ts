import Parceiro from "../../parceiro/model/parceiro.model";

export default class Orcamento {
    public _id: string
    public parceiro:Parceiro
    public selecionado: boolean
    constructor(public parceiroId: string, public valor: string, public mensagem: string,
    ) { }
}
