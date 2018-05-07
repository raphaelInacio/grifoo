import Endereco from "../../endereco/model/endereco.model";
import Cliente from "../../cliente/model/cliente.model";
import Servico from "../../shared/servico.model";

export default class Pedido {
    public id:String
    public status:String
    public enderecoId:String
    public clienteId:String
    public servicoId:String
    public tipoPedido:String
    public mensagem:String
}