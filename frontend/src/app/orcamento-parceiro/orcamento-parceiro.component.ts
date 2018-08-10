import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgForm } from '@angular/forms';
import Orcamento from './model/orcamento.model';
import { OrcamentoParceiroService } from './service/orcamento-parceiro.service';

@Component({
  selector: 'app-orcamento-parceiro',
  templateUrl: './orcamento-parceiro.component.html',
  styleUrls: ['./orcamento-parceiro.component.css']
})
export class OrcamentoParceiroComponent implements OnInit {

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

  constructor(
    private route: ActivatedRoute,
    private parceiroService: ParceiroService,
    private pedidoService: PedidoService,
    private clenteService: ClienteService,
    private enderecoService: EnderecoService,
    private eventoService: EventoService,
    private orcamentoParceiroService: OrcamentoParceiroService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.pedidoId = params['orcamento-id']
      this.parceiroId = params['parceiro-id'];
      this.carregarDadosDoPedido(this.pedidoId)
      this.carregarInformacoesParceiro(this.parceiroId)
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
        this.buscarCliente(this.pedido.clienteId)
        this.buscarEndereco(this.pedido.enderecoId)
        this.buscarEvento(this.pedido.eventoId)
        this.obterUltimoOrcamentoParceiro(this.parceiroId, this.pedido.orcamentos)
      }))
      .subscribe()
  }

  private carregarInformacoesParceiro(parceiroId: string): void {
    this.parceiroService.buscarParceiro(parceiroId)
      .pipe(tap((response: Parceiro) => {
        console.log(`Buscando cliente: ${JSON.stringify(response)}`)
        this.parceiro = new Parceiro();
        this.parceiro = response;
      }))
      .subscribe()
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

  public enviarOrcamento(): void {

    let orcamento = new Orcamento(this.parceiroId, this.formulario.form.value.valor, this.formulario.form.value.mensagem);

    this.orcamentoParceiroService.enviarOrcamento(this.pedidoId, orcamento)
      .pipe(tap((response: Orcamento) => {
        console.log(`Orcamento enviado: ${JSON.stringify(response)}`)
        this.sucesso = true;
        this.orcamentoParceiro = false
        this.atualizarProgresso("Aguardando aprovação do cliente", 25)
      }))
      .subscribe()
  }

  private obterUltimoOrcamentoParceiro(parceiroId: string, orcamentos: Array<Orcamento>) {
    
    if(orcamentos) {

      orcamentos.forEach((orcamentoItem) => {
        if (orcamentoItem.parceiroId === parceiroId) {
          this.orcamento = new Orcamento(orcamentoItem.parceiroId, orcamentoItem.valor, orcamentoItem.mensagem)
        }
      });
      
      if (this.orcamento) {
        this.mostrarUltimaCotacao = true;
        this.atualizarProgresso("Aguardando aprovação do cliente", 25)
      }
    }

  }

}
