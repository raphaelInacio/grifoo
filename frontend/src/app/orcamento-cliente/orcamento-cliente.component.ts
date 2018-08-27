import { tap } from 'rxjs/operators';
import { EventoService } from './../evento/service/evento.service';
import { EnderecoService } from './../endereco/service/endereco.service';
import { ClienteService } from './../cliente/services/cliente.service';
import { PedidoService } from './../pedido/service/pedido.service';
import { ParceiroService } from './../parceiro/service/parceiro.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from './../evento/model/evento.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import Endereco from '../endereco/model/endereco.model';
import Cliente from '../cliente/model/cliente.model';
import Parceiro from '../parceiro/model/parceiro.model';
import Pedido from '../pedido/model/pedido.model';
import Orcamento from '../orcamento-parceiro/model/orcamento.model';
import { OrcamentoClienteService } from './service/orcamento-cliente.service';

@Component({
  selector: 'app-orcamento-cliente',
  templateUrl: './orcamento-cliente.component.html',
  styleUrls: ['./orcamento-cliente.component.css']
})
export class OrcamentoClienteComponent implements OnInit {

  parceiroId: string;
  pedidoId: string;
  private sub: any;

  @ViewChild('formulario') public formulario: NgForm

  public cliente: Cliente
  public endereco: Endereco
  public evento: Evento
  public parceiro: Parceiro
  public pedido: Pedido
  public sucesso: boolean = false
  public orcamentoParceiro: boolean = true
  public mostrarUltimaCotacao: boolean = false
  public progresso: number = 0
  public titulo: String = "Enviar cotação"
  public progressoStyle:Object = {'width':'0%'}
  public orcamento: Orcamento;
  public orcamentos: Array<Orcamento> = new Array<Orcamento>();

  constructor(
    private route: ActivatedRoute,
    private parceiroService: ParceiroService,
    private pedidoService: PedidoService,
    private clenteService: ClienteService,
    private enderecoService: EnderecoService,
    private eventoService: EventoService,
    private orcamentoClienteService: OrcamentoClienteService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.pedidoId = params['orcamento-id']
      this.parceiroId = params['cliente-id'];
      this.carregarDadosDoPedido(this.pedidoId)
    });
    console.log(this.route.params)
  }

  private atualizarProgresso(titulo:string, progresso: number){
    this.progresso = (this.progresso = progresso)
    this.progressoStyle = {'width':`${this.progresso}%`}
    this.titulo = titulo
  }


  private carregarDadosDoPedido(pedidoId: string): void {
    this.pedidoService.buscarPedido(pedidoId)
      .pipe(tap((response: Pedido) => {
        console.log(`Buscando pedido: ${JSON.stringify(response)}`)
        this.pedido = new Pedido()
        this.pedido = response
        this.orcamentos = this.pedido.orcamentos
        this.buscarCliente(this.pedido.clienteId)
        this.buscarEndereco(this.pedido.enderecoId)
        this.buscarEvento(this.pedido.eventoId)
        this.carregarOrcamentos()
      }))
      .subscribe()
  }

  private carregarOrcamentos(): void {

    this.orcamentos.forEach((orcamentoItem) => {

      this.parceiroService.buscarParceiro(orcamentoItem.parceiroId)
      .pipe(tap((response: Parceiro) => {
        console.log(`Buscando cliente: ${JSON.stringify(response)}`)
        this.parceiro = new Parceiro();
        orcamentoItem.parceiro = response;
      }))
      .subscribe()

    });
    
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

  public selecionarCotacao(orcamento: Orcamento): void {

    this.orcamentoClienteService.selecionarOrcamento(this.pedido._id, orcamento.parceiroId)
    .pipe(tap((response: Pedido) => {
      console.log(`Buscando evento: ${JSON.stringify(response)}`)
        console.log(` Orçamento selecionado com sucesso: ${JSON.stringify(response)}`)
        this.carregarDadosDoPedido(response._id)
    }))
    .subscribe()
  }

  public cancelarCotacao(orcamento: Orcamento): void {

    this.orcamentoClienteService.cancelarOrcamento(this.pedido._id, orcamento.parceiroId)
    .pipe(tap((response: Pedido) => {
      console.log(`Buscando evento: ${JSON.stringify(response)}`)
        console.log(` Orçamento cancelado com sucesso: ${JSON.stringify(response)}`)
        this.carregarDadosDoPedido(response._id)
    }))
    .subscribe()
  }

  public reprovarCotacao(orcamento: Orcamento): void {

    this.orcamentoClienteService.reprovarOrcamento(this.pedido._id, orcamento.parceiroId)
    .pipe(tap((response: Pedido) => {
      console.log(`Buscando evento: ${JSON.stringify(response)}`)
        console.log(` Orçamento reprovado com sucesso: ${JSON.stringify(response)}`)
        this.carregarDadosDoPedido(response._id)
    }))
    .subscribe()
  }
}
