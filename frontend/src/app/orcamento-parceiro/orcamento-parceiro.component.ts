import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../pedido/service/pedido.service';
import { ParceiroService } from '../parceiro/service/parceiro.service';
import { ClienteService } from '../cliente/services/cliente.service';
import { EnderecoService } from '../endereco/service/endereco.service';
import { EventoService } from '../evento/service/evento.service';
import Cliente from '../cliente/model/cliente.model';
import Endereco from '../endereco/model/endereco.model';
import { Evento } from '../evento/model/evento.model';
import Parceiro from '../parceiro/model/parceiro.model';
import { tap } from 'rxjs/operators';
import Pedido from '../pedido/model/pedido.model';

@Component({
  selector: 'app-orcamento-parceiro',
  templateUrl: './orcamento-parceiro.component.html',
  styleUrls: ['./orcamento-parceiro.component.css']
})
export class OrcamentoParceiroComponent implements OnInit {

  parceiroId: string;
  pedidoId: string;
  private sub: any;

  public cliente: Cliente
  public endereco: Endereco
  public evento: Evento
  public parceiro: Parceiro
  public pedido: Pedido

  constructor(private route: ActivatedRoute, 
    private parceiroService: ParceiroService, 
    private pedidoService: PedidoService, 
    private clenteService: ClienteService, 
    private enderecoService: EnderecoService, 
    private eventoService: EventoService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.pedidoId = params['orcamento-id']
      this.parceiroId = params['parceiro-id'];
      this.carregarDadosDoPedido(this.pedidoId)
      this.carregarInformacoesParceiro(this.parceiroId)
    });
    console.log(this.route.params)
  }


  private carregarDadosDoPedido(pedidoId: string): void {
    this.pedidoService.buscarPedido(pedidoId)
      .pipe(tap((response: Pedido) => {
        console.log(`Buscando pedido: ${JSON.stringify(response)}`)
        this.pedido = new Pedido()
        this.pedido = response
        this.buscarCliente(this.pedido.clienteId)
        this.buscarEndereco(this.pedido.enderecoId)
        this.buscarEvento(this.pedido.eventoId)
      }))
      .subscribe()
  }

  private carregarInformacoesParceiro(parceiroId: string): void {
  }

  private buscarCliente(clienteId: string): void {
    this.clenteService.buscarCliente(clienteId)
      .pipe(tap((response: Cliente) => {
        console.log(`Buscando cliente: ${JSON.stringify(response)}`)
        this.cliente = new Cliente(response.nome, response.email, response.telefone);
      }))
      .subscribe()
  }

  private buscarEndereco(enderecoId: string): void {
    this.enderecoService.buscarEndereco(enderecoId)
      .pipe(tap((response: Endereco) => {
        console.log(`Buscando endereco: ${JSON.stringify(response)}`)
        this.endereco = new Endereco(response.rua, response.numero, response.complemento, response.cep, response.bairro, response.cidade, response.estado)
      }))
      .subscribe()
  }

  private buscarEvento(eventoId: string): void {
    this.eventoService.buscarEvento(eventoId)
      .pipe(tap((response: Evento) => {
        console.log(`Buscando evento: ${JSON.stringify(response)}`)
        this.evento = new Evento(response.tipoEvento, response.outrasInformacoes, response.duracaoEvento, response.dataHoraDeInicio, response.numeroPessoas)
      }))
      .subscribe()
  }

}
