import { Component, OnInit } from '@angular/core';
import Pedido from '../pedido/model/pedido.model';
import Parceiro from '../parceiro/model/parceiro.model';
import Cliente from '../cliente/model/cliente.model';
import { ParceiroService } from '../parceiro/service/parceiro.service';
import { ClienteService } from '../cliente/services/cliente.service';
import { PedidoService } from '../pedido/service/pedido.service';
import { tap } from 'rxjs/operators';
import { EnderecoService } from '../endereco/service/endereco.service';
import { EventoService } from '../evento/service/evento.service';
import { OrcamentoClienteService } from '../orcamento-cliente/service/orcamento-cliente.service';
import Endereco from '../endereco/model/endereco.model';
import { Evento } from '../evento/model/evento.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public pedidos: Array<Pedido> = new Array<Pedido>();
  public fornecedores: Array<Parceiro> = new Array<Parceiro>();
  public clientes: Array<Cliente> = new Array<Cliente>();

  public mostraClientes: boolean = false;
  public mostraFornecedores: boolean = false;
  public mostraPedidos: boolean = true;

  constructor(
    private pedidoService: PedidoService,
    private parceiroService: ParceiroService,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private eventoService: EventoService,
    private orcamentoClienteService: OrcamentoClienteService) { }


  ngOnInit() {
    this.listarClientes();
    this.listarFornecedores();
    this.listarPedidos();
  }

  public listarPedidos(): void {
    this.pedidoService.buscarPedidos()
      .pipe(
        tap((response: Array<Pedido>) => {

          console.log(`Busca de pedidos: ${JSON.stringify(response)}`)

          this.pedidos = response;

          this.pedidos.forEach(pedido => {

            this.buscarCliente(pedido.clienteId)
              .pipe(tap((response: Cliente) => {
                console.log(`Buscando cliente: ${JSON.stringify(response)}`)
                pedido.cliente = new Cliente(response.nome, response.email, response.telefone);
              }))
              .subscribe()

            this.buscarEndereco(pedido.enderecoId)
              .pipe(tap((response: Endereco) => {
                console.log(`Buscando endereco: ${JSON.stringify(response)}`)
                pedido.endereco = new Endereco(response.rua, response.numero, response.complemento, response.cep, response.bairro, response.cidade, response.estado)
              }))
              .subscribe()

            this.buscarEvento(pedido.eventoId)
              .pipe(tap((response: Evento) => {
                console.log(`Buscando evento: ${JSON.stringify(response)}`)
                pedido.evento = new Evento(response.tipoEvento, response.outrasInformacoes, response.duracaoEvento, response.dataHoraDeInicio, response.numeroPessoas)
              }))
              .subscribe()
          });
        }))
      .subscribe()
  }

  public listarClientes(): void {
    this.clienteService.buscarClientes()
      .pipe(
        tap((response: Array<Cliente>) => {
          console.log(`Busca de clientes: ${JSON.stringify(response)}`)
          this.clientes = response;
        }))
      .subscribe()
  }

  public listarFornecedores(): void {
    this.parceiroService.buscarParceiros()
      .pipe(
        tap((response: Array<Parceiro>) => {
          console.log(`Busca de pareceiros: ${JSON.stringify(response)}`)
          this.fornecedores = response;
        }))
      .subscribe()
  }

  private buscarCliente(clienteId: string): Observable<Cliente> {
    return this.clienteService.buscarCliente(clienteId);
  }

  private buscarEndereco(enderecoId: string): Observable<Endereco> {
    return this.enderecoService.buscarEndereco(enderecoId)
  }

  private buscarEvento(eventoId: string): Observable<Evento> {
    return this.eventoService.buscarEvento(eventoId)
  }

  public mostrarClientes(): void {
    this.mostraClientes = true
    this.mostraFornecedores = false
    this.mostraPedidos = false
  }
  public mostrarFornecedores(): void {
    this.mostraFornecedores = true
    this.mostraClientes = false
    this.mostraPedidos = false
  }
  public mostrarPedidos(): void {
    this.mostraPedidos = true
    this.mostraClientes = false
    this.mostraFornecedores = false
  }
}
