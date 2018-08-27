import Orcamento from "../../orcamento-parceiro/model/orcamento.model";

export default class Pedido {
    public id: string
    public status: string
    public enderecoId: string
    public clienteId: string
    public eventoId: string
    public tipoPedido: string
    public mensagem: string
    public orcamentos: Array<Orcamento>
}