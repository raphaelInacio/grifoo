import { EnderecoComponent } from './../endereco/endereco.component';
import { Evento } from './../evento/model/evento.model';
import {
  Injectable, Input
} from '@angular/core';
import {
  Component,
  OnInit
} from '@angular/core';
import PedidoService from '../pedido/service/pedido.service'
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import Endereco from '../endereco/model/endereco.model';
import Cliente from '../cliente/model/cliente.model';
import Pedido from './model/pedido.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService]
})

@Injectable()
export class PedidoComponent implements OnInit {

  constructor(private pedidoService: PedidoService) {
  }

  public cliente: Cliente
  public endereco: Endereco
  public evento: Evento
  public pedido:Pedido

  public progresso: number = 0
  public titulo: String = "Dados do cliente"
  public progressoStyle:Object = {'width':'0%'}

  public inserirCliente:boolean = true
  public inserirEvento:boolean = false
  public inserirEndereco:boolean = false
  public confirmacao: boolean = false
  public sucesso: boolean = false
  
  ngOnInit() { }

  clienteSalvoEmiter(cliente:Cliente){
    console.log(`cliente salvo ${JSON.stringify(cliente)}`)
    this.cliente = cliente
    this.inserirCliente = false
    this.inserirEndereco = true
    this.atualizarProgresso("Endereço")
  }

  atualizarProgresso(titulo:string){
    this.progresso = (this.progresso + 25)
    this.progressoStyle = {'width':`${this.progresso}%`}
    this.titulo = titulo
  }

  eventoSalvoEmiter(evento:Evento){
    console.log(`evento salvo ${JSON.stringify(evento)}`)
    this.evento = evento
    this.inserirEvento = false
    this.confirmacao = true
    this.atualizarProgresso("Confirmação")
  }

  enderecoSalvoEmiter(endereco:Endereco){
    console.log(`endereco salvo ${JSON.stringify(endereco)}`)
    this.endereco = endereco
    this.inserirEndereco = false
    this.inserirEvento = true
    this.atualizarProgresso("Evento")
  }

  public confirmarPedidoEmiter(confirmardo:boolean):void{
    
    console.log("Criando pedido..")
    
    this.pedido = new Pedido()
    this.pedido.enderecoId = this.endereco._id
    this.pedido.enderecoId = this.evento._id
    this.pedido.clienteId = this.cliente._id
    this.pedido.status = "ABERTO"

    this.pedidoService.salvarPedido(this.pedido)
    .pipe(tap((response: Pedido) => {
      console.log(`Pedido criado com sucesso: ${JSON.stringify(response)}`)
      this.pedido = response
    }))
    .subscribe()
    this.sucesso = true
    this.confirmacao = false
    this.atualizarProgresso("Finalização do pedido")
  }
   
}
