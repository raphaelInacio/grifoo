import Orcamento from "../../orcamento-parceiro/model/orcamento.model";
import Cliente from "../../cliente/model/cliente.model";
import { Evento } from "../../evento/model/evento.model";
import Endereco from "../../endereco/model/endereco.model";

export default class Pedido {
    public id: string
    public _id: string
    public status: string
    public enderecoId: string
    public clienteId: string
    public eventoId: string
    public tipoPedido: string
    public mensagem: string
    public orcamentos: Array<Orcamento>
    public cliente:Cliente;
    public evento:Evento;
    public endereco:Endereco;
}